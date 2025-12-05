import type {
	Env,
	FlagMode,
	LanguageRow,
	LanguageScriptRow,
	LanguageRegionRow,
	LanguageData,
	RegionData,
	ScriptData,
	LanguageEntry,
	LanguageLookupResult,
	LanguageLookupOptions,
	LanguageSelectorOptions,
	StaticLanguageFile
} from './types';
import {
	findLanguageByCode,
	findLanguageByEndonym,
	findLanguageByName,
	getAllLanguages,
	getLanguageData,
	getRegionData,
	getLanguageRegion,
	getScriptData,
	getScriptInfo,
	getLanguageFlagOrder,
	getLanguageScriptFlagOrder,
	getFlagsSvg,
	getAllFlags
} from './db';

function normalize(str: string): string {
	return str
		.toLowerCase()
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '');
}

function parseLanguageTag(input: string): { lang: string; script?: string; region?: string } {
	const parts = input.replace(/_/g, '-').split('-');
	const result: { lang: string; script?: string; region?: string } = { lang: parts[0] };

	for (let i = 1; i < parts.length; i++) {
		const part = parts[i];
		if (part.length === 4 && /^[A-Za-z]{4}$/.test(part)) {
			result.script = part.charAt(0).toUpperCase() + part.slice(1).toLowerCase();
		} else if (part.length === 2 && /^[A-Za-z]{2}$/.test(part)) {
			result.region = part.toUpperCase();
		}
	}

	return result;
}

async function findLanguageCode(db: D1Database, input: string): Promise<string | null> {
	const normalizedInput = normalize(input);

	const exactMatch = await findLanguageByCode(db, input);
	if (exactMatch) return exactMatch.code;

	const endonymMatch = await findLanguageByEndonym(db, input);
	if (endonymMatch) return endonymMatch.code;

	const nameMatch = await findLanguageByName(db, input);
	if (nameMatch) return nameMatch.code;

	const allLanguages = await getAllLanguages(db);

	for (const lang of allLanguages) {
		if (lang.endonym && normalize(lang.endonym) === normalizedInput) {
			return lang.code;
		}
	}

	for (const lang of allLanguages) {
		if (normalize(lang.name) === normalizedInput) {
			return lang.code;
		}
	}

	return null;
}

function toLanguageData(row: LanguageRow): LanguageData {
	return {
		code: row.code,
		name: row.name,
		terminologyCode: row.terminology_code,
		bibliographicCode: row.bibliographic_code,
		twoLetterCode: row.two_letter_code,
		endonym: row.endonym,
		defaultDirection: row.default_direction,
		spacing: row.spacing
	};
}

function toRegionData(row: LanguageRegionRow): RegionData {
	return {
		regionCode: row.region_code,
		regionNameEnglish: row.region_name_english,
		regionNameNative: row.region_name_native,
		languageNameInRegion: row.language_name_in_region
	};
}

function toScriptData(row: LanguageScriptRow, scriptNameEnglish: string): ScriptData {
	return {
		scriptVariant: row.script_variant,
		scriptNameEnglish,
		scriptNameLocal: row.script_name_local,
		languageInScript: row.language_in_script
	};
}

async function lookupLanguages(
	db: D1Database,
	inputs: string[],
	options: LanguageLookupOptions = {}
): Promise<LanguageLookupResult> {
	const flagMode: FlagMode = options.flagMode ?? 'none';
	const flagLimit = flagMode === 'single' ? 1 : flagMode === 'all' ? 4 : 0;

	const result: LanguageLookupResult = {
		data: {},
		resolved: [],
		normalized: {},
		invalid: []
	};

	const processedCodes = new Set<string>();

	for (const input of inputs) {
		const parsed = parseLanguageTag(input);
		const langCode = await findLanguageCode(db, parsed.lang);

		if (!langCode) {
			result.invalid.push(input);
			continue;
		}

		if (parsed.lang !== langCode) {
			result.normalized[input] = langCode;
		}

		if (!processedCodes.has(langCode)) {
			processedCodes.add(langCode);

			const langRow = await getLanguageData(db, langCode);
			if (!langRow) {
				result.invalid.push(input);
				continue;
			}

			const entry: LanguageEntry = {
				data: toLanguageData(langRow)
			};

			const scripts = await getScriptData(db, langCode);
			if (scripts.length > 0) {
				entry.scriptData = {};
				for (const script of scripts) {
					const scriptInfo = await getScriptInfo(db, script.script_variant);
					const scriptNameEnglish = scriptInfo?.name_english ?? script.script_variant;
					entry.scriptData[script.script_variant] = toScriptData(script, scriptNameEnglish);
				}
			}

			if (flagMode !== 'none') {
				const baseLangFlags = await getLanguageFlagOrder(db, langCode, flagLimit);
				if (baseLangFlags.length > 0) {
					entry.flags = baseLangFlags;
				}

				if (scripts.length > 0) {
					entry.scriptFlags = {};
					for (const script of scripts) {
						const scriptFlags = await getLanguageScriptFlagOrder(
							db,
							langCode,
							script.script_variant,
							flagLimit
						);
						if (scriptFlags.length > 0) {
							entry.scriptFlags[script.script_variant] = scriptFlags;
						}
					}
				}
			}

			result.data[langCode] = entry;
		}

		if (parsed.region) {
			const regionRow = await getLanguageRegion(db, langCode, parsed.region);
			if (regionRow) {
				const entry = result.data[langCode];
				if (!entry.regionData) {
					entry.regionData = {};
				}
				if (!entry.regionData[regionRow.region_code]) {
					entry.regionData[regionRow.region_code] = toRegionData(regionRow);
				}
			}
		}

		let resolvedTag = langCode;
		if (parsed.script) {
			resolvedTag += `-${parsed.script}`;
		}
		if (parsed.region) {
			resolvedTag += `-${parsed.region}`;
		}

		if (!result.resolved.includes(resolvedTag)) {
			result.resolved.push(resolvedTag);
		}
	}

	return result;
}

function generateStaticFile(
	result: LanguageLookupResult,
	options: LanguageSelectorOptions,
	version: string
): StaticLanguageFile {
	return {
		meta: {
			generatedAt: new Date().toISOString(),
			version
		},
		options,
		result
	};
}

function corsHeaders(): HeadersInit {
	return {
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
		'Access-Control-Allow-Headers': 'Content-Type'
	};
}

function jsonResponse(data: unknown, status = 200): Response {
	return new Response(JSON.stringify(data), {
		status,
		headers: {
			'Content-Type': 'application/json',
			...corsHeaders()
		}
	});
}

function errorResponse(message: string, status = 400): Response {
	return jsonResponse({ error: message }, status);
}

export default {
	async fetch(request: Request, env: Env): Promise<Response> {
		try {
			if (request.method === 'OPTIONS') {
				return new Response(null, { headers: corsHeaders() });
			}

			const url = new URL(request.url);
			const path = url.pathname;

			if (path === '/' || path === '/health') {
				return jsonResponse({
					status: 'ok',
					version: env.API_VERSION,
					endpoints: {
						'/languages': 'GET/POST - Lookup language data',
						'/languages/file': 'GET/POST - Generate static language file',
						'/flags/:code': 'GET - Get flag SVG by country code',
						'/all-flags': 'GET - Get all flags as JSON (cacheable)',
						'/embed.js': 'GET - Embeddable script for HTML integration',
						'/embed/hydrate': 'GET - Pre-hydrated component HTML/CSS'
					}
				});
			}

			if (path === '/languages' || path === '/languages/') {
				return handleLanguagesRequest(request, env);
			}

			if (path === '/languages/file' || path === '/languages/file/') {
				return handleLanguageFileRequest(request, env);
			}

			if (path === '/all-flags' || path === '/all-flags/') {
				return handleAllFlagsRequest(env);
			}

			if (path.startsWith('/flags/')) {
				const code = path.replace('/flags/', '').replace('/', '');
				return handleFlagRequest(code, env);
			}

			return errorResponse('Not found', 404);
		} catch (err) {
			const message = err instanceof Error ? err.message : 'Internal server error';
			return errorResponse(message, 500);
		}
	}
};

interface LanguagesRequestBody {
	languages: string[];
	flagMode?: FlagMode;
}

async function handleLanguagesRequest(request: Request, env: Env): Promise<Response> {
	let languages: string[] = [];
	let flagMode: FlagMode = 'none';

	if (request.method === 'GET') {
		const url = new URL(request.url);
		const langsParam = url.searchParams.get('languages') || url.searchParams.get('l');
		if (!langsParam) {
			return errorResponse('Missing "languages" or "l" query parameter');
		}
		languages = langsParam.split(',').map((l) => l.trim()).filter(Boolean);
		flagMode = (url.searchParams.get('flagMode') || url.searchParams.get('f') || 'none') as FlagMode;
	} else if (request.method === 'POST') {
		try {
			const body = await request.json() as LanguagesRequestBody;
			languages = body.languages || [];
			flagMode = body.flagMode || 'none';
		} catch {
			return errorResponse('Invalid JSON body');
		}
	} else {
		return errorResponse('Method not allowed', 405);
	}

	if (languages.length === 0) {
		return errorResponse('No languages provided');
	}

	if (!['none', 'single', 'all'].includes(flagMode)) {
		return errorResponse('Invalid flagMode. Must be "none", "single", or "all"');
	}

	try {
		const result = await lookupLanguages(env.DB, languages, { flagMode });
		return jsonResponse(result);
	} catch (err) {
		const message = err instanceof Error ? err.message : 'Database error';
		return errorResponse(message, 500);
	}
}

interface LanguageFileRequestBody extends LanguagesRequestBody {
	options?: LanguageSelectorOptions;
}

async function handleLanguageFileRequest(request: Request, env: Env): Promise<Response> {
	let languages: string[] = [];
	let flagMode: FlagMode = 'none';
	let selectorOptions: LanguageSelectorOptions = {};

	if (request.method === 'GET') {
		const url = new URL(request.url);
		const langsParam = url.searchParams.get('languages') || url.searchParams.get('l');
		if (!langsParam) {
			return errorResponse('Missing "languages" or "l" query parameter');
		}
		languages = langsParam.split(',').map((l) => l.trim()).filter(Boolean);
		flagMode = (url.searchParams.get('flagMode') || url.searchParams.get('f') || 'none') as FlagMode;
		
		if (url.searchParams.has('buttonSize')) {
			selectorOptions.buttonSize = url.searchParams.get('buttonSize') as 'sm' | 'lg';
		}
		if (url.searchParams.has('isModal')) {
			selectorOptions.isModal = url.searchParams.get('isModal') === 'true';
		}
		if (url.searchParams.has('confirmSelection')) {
			selectorOptions.confirmSelection = url.searchParams.get('confirmSelection') === 'true';
		}
		if (url.searchParams.has('showEnglishName')) {
			selectorOptions.showEnglishName = url.searchParams.get('showEnglishName') === 'true';
		}
		selectorOptions.flagMode = flagMode;
	} else if (request.method === 'POST') {
		try {
			const body = await request.json() as LanguageFileRequestBody;
			languages = body.languages || [];
			flagMode = body.flagMode || 'none';
			selectorOptions = body.options || {};
			selectorOptions.flagMode = flagMode;
		} catch {
			return errorResponse('Invalid JSON body');
		}
	} else {
		return errorResponse('Method not allowed', 405);
	}

	if (languages.length === 0) {
		return errorResponse('No languages provided');
	}

	if (!['none', 'single', 'all'].includes(flagMode)) {
		return errorResponse('Invalid flagMode. Must be "none", "single", or "all"');
	}

	try {
		const result = await lookupLanguages(env.DB, languages, { flagMode });
		const file = generateStaticFile(result, selectorOptions, env.API_VERSION);
		return jsonResponse(file);
	} catch (err) {
		const message = err instanceof Error ? err.message : 'Database error';
		return errorResponse(message, 500);
	}
}

async function handleFlagRequest(code: string, env: Env): Promise<Response> {
	if (!code) {
		return errorResponse('Missing country code');
	}

	try {
		const flags = await getFlagsSvg(env.DB, [code]);
		const svg = flags[code.toLowerCase()];

		if (!svg) {
			return errorResponse('Flag not found', 404);
		}

		return new Response(svg, {
			headers: {
				'Content-Type': 'image/svg+xml',
				'Cache-Control': 'public, max-age=86400',
				...corsHeaders()
			}
		});
	} catch (err) {
		const message = err instanceof Error ? err.message : 'Database error';
		return errorResponse(message, 500);
	}
}

async function handleAllFlagsRequest(env: Env): Promise<Response> {
	try {
		const flags = await getAllFlags(env.DB);
		return new Response(JSON.stringify(flags), {
			headers: {
				'Content-Type': 'application/json',
				'Cache-Control': 'public, max-age=86400',
				...corsHeaders()
			}
		});
	} catch (err) {
		const message = err instanceof Error ? err.message : 'Database error';
		return errorResponse(message, 500);
	}
}

