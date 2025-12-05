import { LanguageLookupResult, FlagDisplayMode } from './types';
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
export interface ParsedTag {
    lang: string;
    script?: string;
    region?: string;
}
export declare function parseTag(tag: string): ParsedTag;
export declare function getFlagsForEntry(parsed: ParsedTag, entry: LanguageLookupResult['data'][string] | undefined, flagMode: FlagDisplayMode): string[];
export declare function svgToDataUri(svg: string): string;
export declare function buildDisplayLanguages(languagesData: LanguageLookupResult, flagMode: FlagDisplayMode): DisplayLanguage[];
export declare function filterLanguages(languages: DisplayLanguage[], searchTerm: string): DisplayLanguage[];
//# sourceMappingURL=language-selector.d.ts.map