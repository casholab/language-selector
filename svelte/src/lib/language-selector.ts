import type { LanguageLookupResult, FlagMode } from './types.ts';

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
	flagMode: FlagMode
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
	flagMode: FlagMode
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

		return {
			code: resolvedTag,
			name: entry?.data.name ?? resolvedTag,
			endonym,
			regionNameEnglish,
			regionNameNative,
			scriptNameEnglish,
			scriptNameLocal,
			flagCodes
		};
	});
}

export function filterLanguages(languages: DisplayLanguage[], searchTerm: string): DisplayLanguage[] {
	if (!searchTerm) return languages;
	const term = searchTerm.toLowerCase();
	return languages.filter(
		(lang) =>
			lang.name.toLowerCase().includes(term) ||
			lang.endonym.toLowerCase().includes(term) ||
			lang.code.toLowerCase().includes(term) ||
			(lang.regionNameEnglish && lang.regionNameEnglish.toLowerCase().includes(term)) ||
			(lang.regionNameNative && lang.regionNameNative.toLowerCase().includes(term)) ||
			(lang.scriptNameEnglish && lang.scriptNameEnglish.toLowerCase().includes(term)) ||
			(lang.scriptNameLocal && lang.scriptNameLocal.toLowerCase().includes(term))
	);
}

