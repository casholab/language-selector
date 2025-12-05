import type { LanguageLookupResult, ServerLoadOptions, FlagLoadMode, LoadOptions, DisplayOptions, FlagList } from './types.js';

const DEFAULT_API_URL = 'https://lsapi.casholab.com';


export async function loadLanguageData(languages: string[], displayOptions: DisplayOptions, loadOptions: LoadOptions): Promise<LanguageLookupResult> {
	let data = await loadDataFromServer(languages, {
		flagDisplayMode: displayOptions.flagMode,
		apiUrl: loadOptions.apiUrl,
		flagLoadMode: loadOptions.flagLoadMode
	})
	return await hydrateFlagData(data, loadOptions.flagLoadMode)
}

async function loadDataFromServer(
	languages: string[],
	options: ServerLoadOptions = {}
): Promise<LanguageLookupResult> {
	const { flagDisplayMode = 'none', apiUrl = DEFAULT_API_URL } = options;

	const params = new URLSearchParams({
		l: languages.join(','),
		f: flagDisplayMode
	});

	const response = await fetch(`${apiUrl}/languages?${params}`);

	if (!response.ok) {
		const error = await response.json().catch(() => ({ error: 'Request failed' }));
		throw new Error(error.error || `HTTP ${response.status}`);
	}

	const result: LanguageLookupResult = await response.json();

	if (!result.resolved || result.resolved.length === 0) {
		throw new Error('Invalid response: no valid languages returned');
	}

	return result;
}

async function hydrateFlagData(
	data: LanguageLookupResult,
	flagLoadMode: FlagLoadMode = 'multi',
	apiUrl: string = DEFAULT_API_URL
): Promise<LanguageLookupResult> {
	if (data.flags && Object.keys(data.flags).length > 0) {
		return data;
	}

	const flagCodes = collectFlagCodes(data);
	if (flagCodes.length === 0) {
		return data;
	}

	let flags: Record<string, string>;

	if (flagLoadMode=='single') {
		flags = await fetchAllFlagsSingleRequest(apiUrl);
	} else {
		flags = await fetchFlags(flagCodes, apiUrl);
	}

	return { ...data, flags };
}

function collectFlagCodes(data: LanguageLookupResult): string[] {
	const codes = new Set<string>();

	for (const entry of Object.values(data.data)) {
		if (entry.flags) {
			entry.flags.forEach((f) => codes.add(f.toLowerCase()));
		}
		if (entry.scriptFlags) {
			for (const scriptFlags of Object.values(entry.scriptFlags)) {
				scriptFlags.forEach((f) => codes.add(f.toLowerCase()));
			}
		}
	}

	return Array.from(codes);
}

async function fetchAllFlagsSingleRequest(apiUrl: string): Promise<FlagList> {

	const response = await fetch(`${apiUrl}/all-flags`);
	if (!response.ok) {
		throw new Error(`Failed to fetch flags: HTTP ${response.status}`);
	}
	return (await response.json()) as FlagList;
}

async function fetchFlag(code: string, apiUrl: string): Promise<string | null> {
	const response = await fetch(`${apiUrl}/flags/${code.toLowerCase()}`);
	if (!response.ok) {
		if (response.status === 404) return null;
		throw new Error(`Failed to fetch flag: HTTP ${response.status}`);
	}
	return response.text();
}

async function fetchFlags(codes: string[], apiUrl: string): Promise<FlagList> {
	const flags: FlagList = {};
	const results = await Promise.all(
		codes.map(async (code) => {
			const svg = await fetchFlag(code, apiUrl);
			return { code: code.toLowerCase(), svg };
		})
	);
	for (const { code, svg } of results) {
		if (svg) flags[code] = svg;
	}
	return flags;
}
