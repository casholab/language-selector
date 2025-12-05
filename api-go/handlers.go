package main

import (
	"database/sql"
	"encoding/json"
	"net/http"
	"regexp"
	"strings"
	"unicode"

	"golang.org/x/text/unicode/norm"
)

type Server struct {
	db         *sql.DB
	apiVersion string
}

func NewServer(db *sql.DB, apiVersion string) *Server {
	return &Server{db: db, apiVersion: apiVersion}
}

func (s *Server) corsHeaders(w http.ResponseWriter) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
}

func (s *Server) jsonResponse(w http.ResponseWriter, data any, status int) {
	s.corsHeaders(w)
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	json.NewEncoder(w).Encode(data)
}

func (s *Server) errorResponse(w http.ResponseWriter, message string, status int) {
	s.jsonResponse(w, ErrorResponse{Error: message}, status)
}

func (s *Server) HandleHealth(w http.ResponseWriter, r *http.Request) {
	if r.Method == http.MethodOptions {
		s.corsHeaders(w)
		w.WriteHeader(http.StatusOK)
		return
	}

	s.jsonResponse(w, HealthResponse{
		Status:  "ok",
		Version: s.apiVersion,
		Endpoints: map[string]string{
			"/languages":       "GET/POST - Lookup language data",
			"/flags/{code}":    "GET - Get flag SVG by country code",
			"/all-flags":       "GET - Get all flags as JSON (cacheable)",
			"/embed":           "GET - Embed widget usage documentation",
			"/embed/loader.js": "GET - Embeddable widget loader script",
		},
	}, http.StatusOK)
}

func (s *Server) HandleLanguages(w http.ResponseWriter, r *http.Request) {
	if r.Method == http.MethodOptions {
		s.corsHeaders(w)
		w.WriteHeader(http.StatusOK)
		return
	}

	var languages []string
	var flagMode FlagMode = FlagModeNone

	switch r.Method {
	case http.MethodGet:
		langsParam := r.URL.Query().Get("languages")
		if langsParam == "" {
			langsParam = r.URL.Query().Get("l")
		}
		if langsParam == "" {
			s.errorResponse(w, `Missing "languages" or "l" query parameter`, http.StatusBadRequest)
			return
		}
		languages = splitAndTrim(langsParam, ",")

		fm := r.URL.Query().Get("flagMode")
		if fm == "" {
			fm = r.URL.Query().Get("f")
		}
		if fm != "" {
			flagMode = FlagMode(fm)
		}

	case http.MethodPost:
		var body LanguagesRequestBody
		if err := json.NewDecoder(r.Body).Decode(&body); err != nil {
			s.errorResponse(w, "Invalid JSON body", http.StatusBadRequest)
			return
		}
		languages = body.Languages
		if body.FlagMode != "" {
			flagMode = body.FlagMode
		}

	default:
		s.errorResponse(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	if len(languages) == 0 {
		s.errorResponse(w, "No languages provided", http.StatusBadRequest)
		return
	}

	if !isValidFlagMode(flagMode) {
		s.errorResponse(w, `Invalid flagMode. Must be "none", "single", or "all"`, http.StatusBadRequest)
		return
	}

	result, err := s.lookupLanguages(languages, LanguageLookupOptions{FlagMode: flagMode})
	if err != nil {
		s.errorResponse(w, err.Error(), http.StatusInternalServerError)
		return
	}

	s.jsonResponse(w, result, http.StatusOK)
}

func (s *Server) HandleFlag(w http.ResponseWriter, r *http.Request) {
	if r.Method == http.MethodOptions {
		s.corsHeaders(w)
		w.WriteHeader(http.StatusOK)
		return
	}

	if r.Method != http.MethodGet {
		s.errorResponse(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	code := strings.TrimPrefix(r.URL.Path, "/flags/")
	code = strings.TrimSuffix(code, "/")

	if code == "" {
		s.errorResponse(w, "Missing country code", http.StatusBadRequest)
		return
	}

	svg, err := getFlagSvg(s.db, code)
	if err != nil {
		s.errorResponse(w, err.Error(), http.StatusInternalServerError)
		return
	}
	if svg == "" {
		s.errorResponse(w, "Flag not found", http.StatusNotFound)
		return
	}

	s.corsHeaders(w)
	w.Header().Set("Content-Type", "image/svg+xml")
	w.Header().Set("Cache-Control", "public, max-age=86400")
	w.WriteHeader(http.StatusOK)
	w.Write([]byte(svg))
}

func (s *Server) HandleAllFlags(w http.ResponseWriter, r *http.Request) {
	if r.Method == http.MethodOptions {
		s.corsHeaders(w)
		w.WriteHeader(http.StatusOK)
		return
	}

	if r.Method != http.MethodGet {
		s.errorResponse(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	flags, err := getAllFlags(s.db)
	if err != nil {
		s.errorResponse(w, err.Error(), http.StatusInternalServerError)
		return
	}

	s.corsHeaders(w)
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Cache-Control", "public, max-age=86400")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(flags)
}

func (s *Server) lookupLanguages(inputs []string, options LanguageLookupOptions) (*LanguageLookupResult, error) {
	flagMode := options.FlagMode
	var flagLimit int
	switch flagMode {
	case FlagModeSingle:
		flagLimit = 1
	case FlagModeAll:
		flagLimit = 4
	default:
		flagLimit = 0
	}

	result := &LanguageLookupResult{
		Data:       make(map[string]LanguageEntry),
		Resolved:   []string{},
		Normalized: make(map[string]string),
		Invalid:    []string{},
	}

	processedCodes := make(map[string]bool)

	for _, input := range inputs {
		parsed := parseLanguageTag(input)
		langCode, err := s.findLanguageCode(parsed.Lang)
		if err != nil {
			return nil, err
		}

		if langCode == "" {
			result.Invalid = append(result.Invalid, input)
			continue
		}

		if parsed.Lang != langCode {
			result.Normalized[input] = langCode
		}

		if !processedCodes[langCode] {
			processedCodes[langCode] = true

			langRow, err := getLanguageData(s.db, langCode)
			if err != nil {
				return nil, err
			}
			if langRow == nil {
				result.Invalid = append(result.Invalid, input)
				continue
			}

			entry := LanguageEntry{
				Data: toLanguageData(langRow),
			}

			scripts, err := getScriptData(s.db, langCode)
			if err != nil {
				return nil, err
			}
			if len(scripts) > 0 {
				entry.ScriptData = make(map[string]ScriptData)
				for _, script := range scripts {
					scriptInfo, err := getScriptInfo(s.db, script.ScriptVariant)
					if err != nil {
						return nil, err
					}
					scriptNameEnglish := script.ScriptVariant
					if scriptInfo != nil {
						scriptNameEnglish = scriptInfo.NameEnglish
					}
					entry.ScriptData[script.ScriptVariant] = toScriptData(&script, scriptNameEnglish)
				}
			}

			if flagMode != FlagModeNone {
				baseLangFlags, err := getLanguageFlagOrder(s.db, langCode, flagLimit)
				if err != nil {
					return nil, err
				}
				if len(baseLangFlags) > 0 {
					entry.Flags = baseLangFlags
				}

				if len(scripts) > 0 {
					entry.ScriptFlags = make(map[string][]string)
					for _, script := range scripts {
						scriptFlags, err := getLanguageScriptFlagOrder(s.db, langCode, script.ScriptVariant, flagLimit)
						if err != nil {
							return nil, err
						}
						if len(scriptFlags) > 0 {
							entry.ScriptFlags[script.ScriptVariant] = scriptFlags
						}
					}
				}
			}

			result.Data[langCode] = entry
		}

		if parsed.Region != "" {
			regionRow, err := getLanguageRegion(s.db, langCode, parsed.Region)
			if err != nil {
				return nil, err
			}
			if regionRow != nil {
				entry := result.Data[langCode]
				if entry.RegionData == nil {
					entry.RegionData = make(map[string]RegionData)
				}
				if _, exists := entry.RegionData[regionRow.RegionCode]; !exists {
					entry.RegionData[regionRow.RegionCode] = toRegionData(regionRow)

					if flagMode != FlagModeNone {
						regionFlag := strings.ToLower(regionRow.RegionCode)
						if !contains(entry.Flags, regionFlag) {
							exists, err := flagExists(s.db, regionFlag)
							if err != nil {
								return nil, err
							}
							if exists {
								entry.Flags = append(entry.Flags, regionFlag)
							}
						}
					}
				}
				result.Data[langCode] = entry
			}
		}

		resolvedTag := langCode
		if parsed.Script != "" {
			resolvedTag += "-" + parsed.Script
		}
		if parsed.Region != "" {
			resolvedTag += "-" + parsed.Region
		}

		if !contains(result.Resolved, resolvedTag) {
			result.Resolved = append(result.Resolved, resolvedTag)
		}
	}

	return result, nil
}

func (s *Server) findLanguageCode(input string) (string, error) {
	normalizedInput := normalize(input)

	exactMatch, err := findLanguageByCode(s.db, input)
	if err != nil {
		return "", err
	}
	if exactMatch != nil {
		return exactMatch.Code, nil
	}

	endonymMatch, err := findLanguageByEndonym(s.db, input)
	if err != nil {
		return "", err
	}
	if endonymMatch != nil {
		return endonymMatch.Code, nil
	}

	nameMatch, err := findLanguageByName(s.db, input)
	if err != nil {
		return "", err
	}
	if nameMatch != nil {
		return nameMatch.Code, nil
	}

	allLanguages, err := getAllLanguages(s.db)
	if err != nil {
		return "", err
	}

	for _, lang := range allLanguages {
		if lang.Endonym != "" && normalize(lang.Endonym) == normalizedInput {
			return lang.Code, nil
		}
	}

	for _, lang := range allLanguages {
		if normalize(lang.Name) == normalizedInput {
			return lang.Code, nil
		}
	}

	return "", nil
}

type parsedTag struct {
	Lang   string
	Script string
	Region string
}

func parseLanguageTag(input string) parsedTag {
	parts := strings.Split(strings.ReplaceAll(input, "_", "-"), "-")
	result := parsedTag{Lang: parts[0]}

	scriptRegex := regexp.MustCompile(`^[A-Za-z]{4}$`)
	regionRegex := regexp.MustCompile(`^[A-Za-z]{2}$`)

	for i := 1; i < len(parts); i++ {
		part := parts[i]
		if len(part) == 4 && scriptRegex.MatchString(part) {
			result.Script = strings.ToUpper(part[:1]) + strings.ToLower(part[1:])
		} else if len(part) == 2 && regionRegex.MatchString(part) {
			result.Region = strings.ToUpper(part)
		}
	}

	return result
}

func normalize(str string) string {
	str = strings.ToLower(str)
	result := norm.NFD.String(str)
	var cleaned strings.Builder
	for _, r := range result {
		if !unicode.Is(unicode.Mn, r) {
			cleaned.WriteRune(r)
		}
	}
	return cleaned.String()
}

func toLanguageData(row *LanguageRow) LanguageData {
	return LanguageData{
		Code:              row.Code,
		Name:              row.Name,
		TerminologyCode:   row.TerminologyCode,
		BibliographicCode: row.BibliographicCode,
		TwoLetterCode:     row.TwoLetterCode,
		Endonym:           row.Endonym,
		DefaultDirection:  row.DefaultDirection,
	}
}

func toRegionData(row *LanguageRegionRow) RegionData {
	return RegionData{
		RegionCode:           row.RegionCode,
		RegionNameEnglish:    row.RegionNameEnglish,
		RegionNameNative:     row.RegionNameNative,
		LanguageNameInRegion: row.LanguageNameInRegion,
	}
}

func toScriptData(row *LanguageScriptRow, scriptNameEnglish string) ScriptData {
	return ScriptData{
		ScriptVariant:     row.ScriptVariant,
		ScriptNameEnglish: scriptNameEnglish,
		ScriptNameLocal:   row.ScriptNameLocal,
		LanguageInScript:  row.LanguageInScript,
	}
}

func isValidFlagMode(fm FlagMode) bool {
	return fm == FlagModeNone || fm == FlagModeSingle || fm == FlagModeAll
}

func splitAndTrim(s, sep string) []string {
	parts := strings.Split(s, sep)
	var result []string
	for _, p := range parts {
		trimmed := strings.TrimSpace(p)
		if trimmed != "" {
			result = append(result, trimmed)
		}
	}
	return result
}

func contains(slice []string, item string) bool {
	for _, s := range slice {
		if s == item {
			return true
		}
	}
	return false
}

func (s *Server) HandleEmbedLoader(w http.ResponseWriter, r *http.Request) {
	if r.Method == http.MethodOptions {
		s.corsHeaders(w)
		w.WriteHeader(http.StatusOK)
		return
	}

	if r.Method != http.MethodGet {
		s.errorResponse(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	content, err := embedLoaderJS.ReadFile("embed-component/dist/loader.js")
	if err != nil {
		s.errorResponse(w, "Embed loader not found", http.StatusNotFound)
		return
	}

	s.corsHeaders(w)
	w.Header().Set("Content-Type", "application/javascript; charset=utf-8")
	w.Header().Set("Cache-Control", "public, max-age=86400")
	w.WriteHeader(http.StatusOK)
	w.Write(content)
}
