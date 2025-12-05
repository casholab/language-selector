import type {
  LanguageLookupResult,
  DisplayOptions,
  StaticLanguageFile,
  LoadOptions,
} from './types';
import { loadLanguageData } from './loader';

const version = '1.0.0';

export function loadDataFromFile(input: string | object): {
  data: LanguageLookupResult;
  displayOptions: DisplayOptions | null;
} {
  let obj: unknown;

  if (typeof input === 'string') {
    try {
      obj = JSON.parse(input);
    } catch (e) {
      throw new Error(
        'Invalid JSON format: ' + (e instanceof Error ? e.message : String(e))
      );
    }
  } else {
    obj = input;
  }

  if (typeof obj !== 'object' || obj === null) {
    throw new Error('Invalid input: expected object');
  }

  const record = obj as Record<string, unknown>;

  if ('data' in record && record.data && typeof record.data === 'object') {
    const data = validateLanguageData(record.data);
    const displayOptions =
      record.displayOptions && typeof record.displayOptions === 'object'
        ? (record.displayOptions as DisplayOptions)
        : null;
    return { data, displayOptions };
  }

  const data = validateLanguageData(obj);
  return { data, displayOptions: null };
}

function validateLanguageData(obj: unknown): LanguageLookupResult {
  if (!obj || typeof obj !== 'object') {
    throw new Error('Invalid language data: expected object');
  }

  const record = obj as Record<string, unknown>;

  if (!record.data || typeof record.data !== 'object') {
    throw new Error("Invalid language data: missing 'data' field");
  }

  if (!Array.isArray(record.resolved) || record.resolved.length === 0) {
    throw new Error("Invalid language data: missing or empty 'resolved' array");
  }

  const dataEntries = record.data as Record<string, unknown>;
  let hasValidLanguage = false;

  for (const entry of Object.values(dataEntries)) {
    if (entry && typeof entry === 'object') {
      const langEntry = entry as Record<string, unknown>;
      const langData = langEntry.data as Record<string, unknown> | undefined;

      if (langData) {
        const hasCode =
          typeof langData.code === 'string' && langData.code.length > 0;
        const hasName =
          typeof langData.name === 'string' && langData.name.length > 0;
        const hasEndonym =
          typeof langData.endonym === 'string' && langData.endonym.length > 0;

        if (hasCode && (hasName || hasEndonym)) {
          hasValidLanguage = true;
          break;
        }
      }
    }
  }

  if (!hasValidLanguage) {
    throw new Error(
      'Invalid language data: requires at least 1 language with code and name/endonym'
    );
  }

  return obj as LanguageLookupResult;
}

export async function generateStaticDataFile(
  languages: string[],
  displayOptions: DisplayOptions,
  loadOptions: LoadOptions
): Promise<StaticLanguageFile> {
  const languageData = await loadLanguageData(
    languages,
    displayOptions,
    loadOptions
  );

  return {
    displayOptions,
    languageData,
    meta: {
      generatedTimestamp: new Date().toISOString(),
      version: version ?? 'unknown',
    },
  };
}

export function downloadStaticDataFile(file: StaticLanguageFile): void {
  const blob = new Blob([JSON.stringify(file, null, 2)], {
    type: 'application/json',
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'language-data.json';
  a.click();
}

