export type FlagMode = 'none' | 'single' | 'all';

export interface LanguageData {
	code: string;
	name: string;
	terminologyCode: string;
	bibliographicCode: string;
	twoLetterCode: string;
	endonym: string;
	defaultDirection: string | null;
	spacing: string | null;
}

export interface RegionData {
	regionCode: string;
	regionNameEnglish: string;
	regionNameNative: string;
	languageNameInRegion: string;
}

export interface ScriptData {
	scriptVariant: string;
	scriptNameEnglish: string;
	scriptNameLocal: string;
	languageInScript: string;
}

export interface LanguageEntry {
	data: LanguageData;
	regionData?: Record<string, RegionData>;
	scriptData?: Record<string, ScriptData>;
	flags?: string[];
	scriptFlags?: Record<string, string[]>;
}

export interface LanguageLookupResult {
	data: Record<string, LanguageEntry>;
	resolved: string[];
	normalized: Record<string, string>;
	invalid: string[];
	flags?: Record<string, string>;
}

export interface LanguageLookupOptions {
	flagMode?: FlagMode;
}

export interface LanguageSelectorOptions {
	buttonSize?: 'sm' | 'lg';
	isModal?: boolean;
	isOpen?: boolean;
	confirmSelection?: boolean;
	showEnglishName?: boolean;
	flagMode?: FlagMode;
}

export interface StaticLanguageFile {
	meta: {
		generatedAt: string;
		version: string;
	};
	options: LanguageSelectorOptions;
	result: LanguageLookupResult;
}

export interface LanguageRow {
	code: string;
	name: string;
	terminology_code: string;
	bibliographic_code: string;
	two_letter_code: string;
	endonym: string;
	default_direction: string | null;
}

export interface LanguageRegionRow {
	language: string;
	region_code: string;
	region_name_english: string;
	region_name_native: string;
	language_name_in_region: string;
}

export interface LanguageScriptRow {
	language: string;
	script_variant: string;
	script_name_local: string;
	language_in_script: string;
}

export interface ScriptRow {
	code: string;
	numeric_code: number;
	name_english: string;
	pva: string;
	unicode_version: string;
}

export interface FlagSvgRow {
	code: string;
	data: string;
}

export interface LanguageFlagOrderRow {
	language_code: string;
	country_code: string;
	order: number;
}

export interface LanguageScriptFlagOrderRow {
	language_code: string;
	script_variant: string;
	country_code: string;
	order: number;
}

export interface Env {
	DB: D1Database;
	API_VERSION: string;
}

