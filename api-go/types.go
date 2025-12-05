package main

type FlagMode string

const (
	FlagModeNone   FlagMode = "none"
	FlagModeSingle FlagMode = "single"
	FlagModeAll    FlagMode = "all"
)

type LanguageData struct {
	Code              string  `json:"code"`
	Name              string  `json:"name"`
	TerminologyCode   string  `json:"terminologyCode"`
	BibliographicCode string  `json:"bibliographicCode"`
	TwoLetterCode     string  `json:"twoLetterCode"`
	Endonym           string  `json:"endonym"`
	DefaultDirection  *string `json:"defaultDirection"`
}

type RegionData struct {
	RegionCode           string `json:"regionCode"`
	RegionNameEnglish    string `json:"regionNameEnglish"`
	RegionNameNative     string `json:"regionNameNative"`
	LanguageNameInRegion string `json:"languageNameInRegion"`
}

type ScriptData struct {
	ScriptVariant     string `json:"scriptVariant"`
	ScriptNameEnglish string `json:"scriptNameEnglish"`
	ScriptNameLocal   string `json:"scriptNameLocal"`
	LanguageInScript  string `json:"languageInScript"`
}

// type RegionCode = string
// type FlagList = map[string]string
// type FlagSVG = string


type LanguageEntry struct {
	Data        LanguageData          `json:"data"`
	RegionData  map[string]RegionData `json:"regionData,omitempty"`
	ScriptData  map[string]ScriptData `json:"scriptData,omitempty"`
	Flags       []string              `json:"flags,omitempty"`
	ScriptFlags map[string][]string   `json:"scriptFlags,omitempty"`
}

type LanguageLookupResult struct {
	Data       map[string]LanguageEntry `json:"data"`
	Resolved   []string                 `json:"resolved"`
	Normalized map[string]string        `json:"normalized"`
	Invalid    []string                 `json:"invalid"`
}

type LanguageLookupOptions struct {
	FlagMode FlagMode
}

type FileMeta struct {
	GeneratedAt string `json:"generatedAt"`
	Version     string `json:"version"`
}

// Database row types
type LanguageRow struct {
	Code              string
	Name              string
	TerminologyCode   string
	BibliographicCode string
	TwoLetterCode     string
	Endonym           string
	DefaultDirection  *string
}

type LanguageRegionRow struct {
	Language             string
	RegionCode           string
	RegionNameEnglish    string
	RegionNameNative     string
	LanguageNameInRegion string
}

type LanguageScriptRow struct {
	Language         string
	ScriptVariant    string
	ScriptNameLocal  string
	LanguageInScript string
}

type ScriptRow struct {
	Code           string
	NumericCode    int
	NameEnglish    string
	PVA            string
	UnicodeVersion string
}

// Request/Response types
type LanguagesRequestBody struct {
	Languages []string `json:"languages"`
	FlagMode  FlagMode `json:"flagMode"`
}

type HealthResponse struct {
	Status    string            `json:"status"`
	Version   string            `json:"version"`
	Endpoints map[string]string `json:"endpoints"`
}

type ErrorResponse struct {
	Error string `json:"error"`
}
