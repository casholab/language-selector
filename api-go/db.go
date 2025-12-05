package main

import (
	"database/sql"
	"strings"
)

func findLanguageByCode(db *sql.DB, input string) (*LanguageRow, error) {
	row := db.QueryRow(`
		SELECT code, name, terminology_code, bibliographic_code, two_letter_code, endonym, default_direction 
		FROM language 
		WHERE code = ?1 OR two_letter_code = ?1 OR terminology_code = ?1 OR bibliographic_code = ?1`,
		input)

	var lang LanguageRow
	err := row.Scan(&lang.Code, &lang.Name, &lang.TerminologyCode, &lang.BibliographicCode,
		&lang.TwoLetterCode, &lang.Endonym, &lang.DefaultDirection)
	if err == sql.ErrNoRows {
		return nil, nil
	}
	if err != nil {
		return nil, err
	}
	return &lang, nil
}

func findLanguageByEndonym(db *sql.DB, input string) (*LanguageRow, error) {
	row := db.QueryRow(`
		SELECT code, name, terminology_code, bibliographic_code, two_letter_code, endonym, default_direction 
		FROM language WHERE endonym = ?`, input)

	var lang LanguageRow
	err := row.Scan(&lang.Code, &lang.Name, &lang.TerminologyCode, &lang.BibliographicCode,
		&lang.TwoLetterCode, &lang.Endonym, &lang.DefaultDirection)
	if err == sql.ErrNoRows {
		return nil, nil
	}
	if err != nil {
		return nil, err
	}
	return &lang, nil
}

func findLanguageByName(db *sql.DB, input string) (*LanguageRow, error) {
	row := db.QueryRow(`
		SELECT code, name, terminology_code, bibliographic_code, two_letter_code, endonym, default_direction 
		FROM language WHERE name = ?`, input)

	var lang LanguageRow
	err := row.Scan(&lang.Code, &lang.Name, &lang.TerminologyCode, &lang.BibliographicCode,
		&lang.TwoLetterCode, &lang.Endonym, &lang.DefaultDirection)
	if err == sql.ErrNoRows {
		return nil, nil
	}
	if err != nil {
		return nil, err
	}
	return &lang, nil
}

func getAllLanguages(db *sql.DB) ([]LanguageRow, error) {
	rows, err := db.Query(`
		SELECT code, name, terminology_code, bibliographic_code, two_letter_code, endonym, default_direction 
		FROM language`)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var languages []LanguageRow
	for rows.Next() {
		var lang LanguageRow
		err := rows.Scan(&lang.Code, &lang.Name, &lang.TerminologyCode, &lang.BibliographicCode,
			&lang.TwoLetterCode, &lang.Endonym, &lang.DefaultDirection)
		if err != nil {
			return nil, err
		}
		languages = append(languages, lang)
	}
	return languages, rows.Err()
}

func getLanguageData(db *sql.DB, code string) (*LanguageRow, error) {
	row := db.QueryRow(`
		SELECT code, name, terminology_code, bibliographic_code, two_letter_code, endonym, default_direction 
		FROM language WHERE code = ?`, code)

	var lang LanguageRow
	err := row.Scan(&lang.Code, &lang.Name, &lang.TerminologyCode, &lang.BibliographicCode,
		&lang.TwoLetterCode, &lang.Endonym, &lang.DefaultDirection)
	if err == sql.ErrNoRows {
		return nil, nil
	}
	if err != nil {
		return nil, err
	}
	return &lang, nil
}

func getLanguageRegion(db *sql.DB, languageCode, regionCode string) (*LanguageRegionRow, error) {
	row := db.QueryRow(`
		SELECT language, region_code, region_name_english, region_name_native, language_name_in_region 
		FROM language_region WHERE language = ? AND region_code = ?`,
		languageCode, regionCode)

	var region LanguageRegionRow
	err := row.Scan(&region.Language, &region.RegionCode, &region.RegionNameEnglish,
		&region.RegionNameNative, &region.LanguageNameInRegion)
	if err == sql.ErrNoRows {
		return nil, nil
	}
	if err != nil {
		return nil, err
	}
	return &region, nil
}

func getScriptData(db *sql.DB, languageCode string) ([]LanguageScriptRow, error) {
	rows, err := db.Query(`
		SELECT language, script_variant, script_name_local, language_in_script 
		FROM language_script WHERE language = ?`, languageCode)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var scripts []LanguageScriptRow
	for rows.Next() {
		var script LanguageScriptRow
		err := rows.Scan(&script.Language, &script.ScriptVariant, &script.ScriptNameLocal, &script.LanguageInScript)
		if err != nil {
			return nil, err
		}
		scripts = append(scripts, script)
	}
	return scripts, rows.Err()
}

func getScriptInfo(db *sql.DB, scriptCode string) (*ScriptRow, error) {
	row := db.QueryRow(`
		SELECT code, numeric_code, name_english, pva, unicode_version 
		FROM script WHERE code = ?`, scriptCode)

	var script ScriptRow
	err := row.Scan(&script.Code, &script.NumericCode, &script.NameEnglish, &script.PVA, &script.UnicodeVersion)
	if err == sql.ErrNoRows {
		return nil, nil
	}
	if err != nil {
		return nil, err
	}
	return &script, nil
}

func getLanguageFlagOrder(db *sql.DB, langCode string, limit int) ([]string, error) {
	rows, err := db.Query(`
		SELECT country_code FROM language_flag_order 
		WHERE language_code = ? ORDER BY "order" LIMIT ?`,
		langCode, limit)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var flags []string
	for rows.Next() {
		var code string
		if err := rows.Scan(&code); err != nil {
			return nil, err
		}
		flags = append(flags, strings.ToLower(code))
	}
	return flags, rows.Err()
}

func getLanguageScriptFlagOrder(db *sql.DB, langCode, scriptVariant string, limit int) ([]string, error) {
	rows, err := db.Query(`
		SELECT country_code FROM language_script_flag_order 
		WHERE language_code = ? AND script_variant = ? ORDER BY "order" LIMIT ?`,
		langCode, scriptVariant, limit)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var flags []string
	for rows.Next() {
		var code string
		if err := rows.Scan(&code); err != nil {
			return nil, err
		}
		flags = append(flags, strings.ToLower(code))
	}
	return flags, rows.Err()
}

func flagExists(db *sql.DB, countryCode string) (bool, error) {
	var exists int
	err := db.QueryRow(`SELECT 1 FROM flag_svg WHERE code = ? LIMIT 1`, strings.ToLower(countryCode)).Scan(&exists)
	if err == sql.ErrNoRows {
		return false, nil
	}
	if err != nil {
		return false, err
	}
	return true, nil
}

func getFlagSvg(db *sql.DB, countryCode string) (string, error) {
	var data string
	err := db.QueryRow(`SELECT data FROM flag_svg WHERE code = ?`, strings.ToLower(countryCode)).Scan(&data)
	if err == sql.ErrNoRows {
		return "", nil
	}
	if err != nil {
		return "", err
	}
	return data, nil
}

func getAllFlags(db *sql.DB) (map[string]string, error) {
	rows, err := db.Query(`SELECT code, data FROM flag_svg`)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	flags := make(map[string]string)
	for rows.Next() {
		var code, data string
		if err := rows.Scan(&code, &data); err != nil {
			return nil, err
		}
		flags[code] = data
	}
	return flags, rows.Err()
}
