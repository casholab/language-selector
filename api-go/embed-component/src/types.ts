export type FlagDisplayMode = 'none' | 'single' | 'all';
export type FlagLoadMode = 'single' | 'multi';
export type ButtonSize = 'sm' | 'lg';

export interface EmbedConfig {
  languages: string[];
  isModal: boolean;
  showEnglishName: boolean;
  flagMode: FlagDisplayMode;
  buttonSize: ButtonSize;
  apiUrl: string;
  flagLoadMode: FlagLoadMode;
  callback?: string;
}

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

export interface DisplayLanguage {
  code: string;
  name: string;
  endonym: string;
  regionNameEnglish?: string;
  regionNameNative?: string;
  scriptNameEnglish?: string;
  scriptNameLocal?: string;
  flagCodes: string[];
}

