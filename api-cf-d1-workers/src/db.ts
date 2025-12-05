//TODO: Convert the * to be proper column names to avoid bullshit 


import type {
	LanguageRow,
	LanguageRegionRow,
	LanguageScriptRow,
	ScriptRow,
	FlagSvgRow,
	LanguageFlagOrderRow,
	LanguageScriptFlagOrderRow
} from './types';

export async function findLanguageByCode(
	db: D1Database,
	input: string
): Promise<LanguageRow | null> {
	const result = await db
		.prepare(
			`SELECT * FROM language WHERE 
			code = ?1 OR 
			two_letter_code = ?1 OR 
			terminology_code = ?1 OR 
			bibliographic_code = ?1`
		)
		.bind(input)
		.first<LanguageRow>();
	return result ?? null;
}

export async function findLanguageByEndonym(
	db: D1Database,
	input: string
): Promise<LanguageRow | null> {
	const result = await db
		.prepare(`SELECT * FROM language WHERE endonym = ?`)
		.bind(input)
		.first<LanguageRow>();
	return result ?? null;
}

export async function findLanguageByName(
	db: D1Database,
	input: string
): Promise<LanguageRow | null> {
	const result = await db
		.prepare(`SELECT * FROM language WHERE name = ?`)
		.bind(input)
		.first<LanguageRow>();
	return result ?? null;
}

export async function getAllLanguages(db: D1Database): Promise<LanguageRow[]> {
	const result = await db.prepare(`SELECT * FROM language`).all<LanguageRow>();
	return result.results;
}

export async function getLanguageData(
	db: D1Database,
	code: string
): Promise<LanguageRow | null> {
	const result = await db
		.prepare(`SELECT * FROM language WHERE code = ?`)
		.bind(code)
		.first<LanguageRow>();
	return result ?? null;
}

export async function getRegionData(
	db: D1Database,
	code: string
): Promise<LanguageRegionRow[]> {
	const result = await db
		.prepare(`SELECT * FROM language_region WHERE language = ?`)
		.bind(code)
		.all<LanguageRegionRow>();
	return result.results;
}

export async function getLanguageRegion(
	db: D1Database,
	languageCode: string,
	regionCode: string
): Promise<LanguageRegionRow | null> {
	const result = await db
		.prepare(`SELECT * FROM language_region WHERE language = ? AND region_code = ?`)
		.bind(languageCode, regionCode)
		.first<LanguageRegionRow>();
	return result ?? null;
}

export async function getScriptData(
	db: D1Database,
	code: string
): Promise<LanguageScriptRow[]> {
	const result = await db
		.prepare(`SELECT * FROM language_script WHERE language = ?`)
		.bind(code)
		.all<LanguageScriptRow>();
	return result.results;
}

export async function getScriptInfo(
	db: D1Database,
	scriptCode: string
): Promise<ScriptRow | null> {
	const result = await db
		.prepare(`SELECT * FROM script WHERE code = ?`)
		.bind(scriptCode)
		.first<ScriptRow>();
	return result ?? null;
}

export async function getLanguageFlagOrder(
	db: D1Database,
	langCode: string,
	limit: number
): Promise<string[]> {
	const result = await db
		.prepare(
			`SELECT country_code FROM language_flag_order WHERE language_code = ? ORDER BY "order" LIMIT ?`
		)
		.bind(langCode, limit)
		.all<LanguageFlagOrderRow>();
	return result.results.map((r) => r.country_code.toLowerCase());
}

export async function getLanguageScriptFlagOrder(
	db: D1Database,
	langCode: string,
	scriptVariant: string,
	limit: number
): Promise<string[]> {
	const result = await db
		.prepare(
			`SELECT country_code FROM language_script_flag_order WHERE language_code = ? AND script_variant = ? ORDER BY "order" LIMIT ?`
		)
		.bind(langCode, scriptVariant, limit)
		.all<LanguageScriptFlagOrderRow>();
	return result.results.map((r) => r.country_code.toLowerCase());
}

export async function getFlagSvg(
	db: D1Database,
	countryCode: string
): Promise<string | null> {
	const result = await db
		.prepare(`SELECT data FROM flag_svg WHERE code = ?`)
		.bind(countryCode.toLowerCase())
		.first<FlagSvgRow>();
	return result?.data ?? null;
}

export async function getFlagsSvg(
	db: D1Database,
	countryCodes: string[]
): Promise<Record<string, string>> {
	if (countryCodes.length === 0) return {};
	
	const placeholders = countryCodes.map(() => '?').join(',');
	const result = await db
		.prepare(`SELECT code, data FROM flag_svg WHERE code IN (${placeholders})`)
		.bind(...countryCodes.map((c) => c.toLowerCase()))
		.all<FlagSvgRow>();
	
	const flags: Record<string, string> = {};
	for (const row of result.results) {
		flags[row.code] = row.data;
	}
	return flags;
}

export async function getAllFlags(db: D1Database): Promise<Record<string, string>> {
	const result = await db
		.prepare(`SELECT code, data FROM flag_svg`)
		.all<FlagSvgRow>();
	
	const flags: Record<string, string> = {};
	for (const row of result.results) {
		flags[row.code] = row.data;
	}
	return flags;
}

