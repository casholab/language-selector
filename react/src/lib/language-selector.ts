import type { LanguageLookupResult, FlagDisplayMode } from './types';

export interface DisplayLanguage {
  code: string;
  name: string;
  endonym: string;
  regionNameEnglish?: string;
  regionNameNative?: string;
  scriptNameEnglish?: string;
  scriptNameLocal?: string;
  flagSvgDataUris: string[];
}

export interface ParsedTag {
  lang: string;
  script?: string;
  region?: string;
}

export function parseTag(tag: string): ParsedTag {
  const parts = tag.split('-');
  const result: ParsedTag = { lang: parts[0] };
  for (let i = 1; i < parts.length; i++) {
    const part = parts[i];
    if (part.length === 4 && /^[A-Za-z]{4}$/.test(part)) {
      result.script = part;
    } else if (part.length === 2 && /^[A-Za-z]{2}$/.test(part)) {
      result.region = part;
    }
  }
  return result;
}

export function getFlagsForEntry(
  parsed: ParsedTag,
  entry: LanguageLookupResult['data'][string] | undefined,
  flagMode: FlagDisplayMode
): string[] {
  if (flagMode === 'none' || !entry) return [];

  if (parsed.region) {
    return [parsed.region.toLowerCase()];
  }

  if (parsed.script && entry.scriptFlags?.[parsed.script]) {
    return entry.scriptFlags[parsed.script];
  }

  return entry.flags ?? [];
}

export function svgToDataUri(svg: string): string {
  return 'data:image/svg+xml,' + encodeURIComponent(svg);
}

export function buildDisplayLanguages(
  languagesData: LanguageLookupResult,
  flagMode: FlagDisplayMode,
  flags?: Record<string, string>
): DisplayLanguage[] {
  return languagesData.resolved.map((resolvedTag) => {
    const parsed = parseTag(resolvedTag);
    const entry = languagesData.data[parsed.lang];

    let regionNameEnglish: string | undefined;
    let regionNameNative: string | undefined;
    let scriptNameEnglish: string | undefined;
    let scriptNameLocal: string | undefined;
    let endonym = entry?.data.endonym ?? '';

    if (parsed.region && entry?.regionData?.[parsed.region]) {
      const regionData = entry.regionData[parsed.region];
      regionNameEnglish = regionData.regionNameEnglish;
      regionNameNative = regionData.regionNameNative;
    }

    if (parsed.script && entry?.scriptData?.[parsed.script]) {
      const scriptData = entry.scriptData[parsed.script];
      scriptNameEnglish = scriptData.scriptNameEnglish;
      scriptNameLocal = scriptData.scriptNameLocal;
      endonym = scriptData.languageInScript || endonym;
    }

    const flagCodes = getFlagsForEntry(parsed, entry, flagMode);
    const flagSvgDataUris = flagCodes
      .map((code) => {
        const svg = flags?.[code] ?? flags?.[code.toLowerCase()];
        return svg ? svgToDataUri(svg) : null;
      })
      .filter((uri): uri is string => uri !== null);

    return {
      code: resolvedTag,
      name: entry?.data.name ?? resolvedTag,
      endonym,
      regionNameEnglish,
      regionNameNative,
      scriptNameEnglish,
      scriptNameLocal,
      flagSvgDataUris,
    };
  }).sort((a, b) => a.endonym.localeCompare(b.endonym));
}

export function filterLanguages(
  languages: DisplayLanguage[],
  searchTerm: string
): DisplayLanguage[] {
  if (!searchTerm) return languages;
  const term = searchTerm.toLowerCase();
  return languages.filter(
    (lang) =>
      lang.name.toLowerCase().includes(term) ||
      lang.endonym.toLowerCase().includes(term) ||
      lang.code.toLowerCase().includes(term) ||
      (lang.regionNameEnglish &&
        lang.regionNameEnglish.toLowerCase().includes(term)) ||
      (lang.regionNameNative &&
        lang.regionNameNative.toLowerCase().includes(term)) ||
      (lang.scriptNameEnglish &&
        lang.scriptNameEnglish.toLowerCase().includes(term)) ||
      (lang.scriptNameLocal &&
        lang.scriptNameLocal.toLowerCase().includes(term))
  );
}

export function getBrowserLocales(): string[] {
  if (typeof navigator === 'undefined') return [];
  return navigator.languages?.slice() ?? (navigator.language ? [navigator.language] : []);
}

export function findMatchingLanguage(
  browserLocales: string[],
  availableLanguages: DisplayLanguage[]
): DisplayLanguage | null {
  const availableCodes = availableLanguages.map((l) => l.code.toLowerCase());
  const availableMap = new Map(availableLanguages.map((l) => [l.code.toLowerCase(), l]));

  for (const browserLocale of browserLocales) {
    const normalized = browserLocale.toLowerCase();

    // Exact match
    if (availableMap.has(normalized)) {
      return availableMap.get(normalized)!;
    }

    // Try without region (e.g., "en-US" -> "en")
    const parsed = parseTag(browserLocale);
    const langOnly = parsed.lang.toLowerCase();
    if (availableMap.has(langOnly)) {
      return availableMap.get(langOnly)!;
    }

    // Try matching just the language part against available codes
    for (const code of availableCodes) {
      const parsedAvailable = parseTag(code);
      if (parsedAvailable.lang.toLowerCase() === langOnly) {
        return availableMap.get(code)!;
      }
    }
  }

  return null;
}
