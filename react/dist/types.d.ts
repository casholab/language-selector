export type LanguageCode = string;
export type FlagDisplayMode = 'none' | 'single' | 'all';
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
export interface DisplayOptions {
    isModal?: boolean;
    showEnglishName?: boolean;
    flagMode?: FlagDisplayMode;
    buttonSize?: 'sm' | 'lg';
}
export interface StaticLanguageFileMetadata {
    generatedTimestamp: string;
    version: string;
}
export interface StaticLanguageFile {
    languageData: LanguageLookupResult;
    displayOptions?: DisplayOptions;
    meta?: StaticLanguageFileMetadata;
}
export type FlagLoadMode = 'single' | 'multi';
export interface LoadOptions {
    apiUrl?: string;
    flagLoadMode?: FlagLoadMode;
}
export interface ServerLoadOptions {
    flagDisplayMode?: FlagDisplayMode;
    apiUrl?: string;
    flagLoadMode?: FlagLoadMode;
}
type regionCode = string;
type flagSVG = string;
export type FlagList = Record<regionCode, flagSVG>;
export {};
//# sourceMappingURL=types.d.ts.map