import { injectStyles } from './styles';
import { createButton } from './button';
import { openModal, updateModal, closeModal } from './modal';
import { openDropdown, updateDropdown, closeDropdown } from './dropdown';
import type { EmbedConfig, LanguageLookupResult, DisplayLanguage, FlagDisplayMode } from './types';

const DEFAULT_API_URL = 'https://lsapi.casholab.com';

function parseConfig(el: HTMLElement): EmbedConfig {
  const languages = (el.getAttribute('languages') || '').split(',').map(s => s.trim()).filter(Boolean);
  
  return {
    languages,
    isModal: el.getAttribute('is-modal') !== 'false',
    showEnglishName: el.getAttribute('show-english-name') !== 'false',
    flagMode: (el.getAttribute('flag-mode') as FlagDisplayMode) || 'none',
    buttonSize: el.getAttribute('button-size') === 'sm' ? 'sm' : 'lg',
    apiUrl: el.getAttribute('api-url') || DEFAULT_API_URL,
    flagLoadMode: el.getAttribute('flag-load-mode') === 'single' ? 'single' : 'multi',
    callback: el.getAttribute('callback') || undefined
  };
}

function parseTag(tag: string): { lang: string; script?: string; region?: string } {
  const parts = tag.split('-');
  const result: { lang: string; script?: string; region?: string } = { lang: parts[0] };
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

function getFlagsForEntry(
  parsed: { lang: string; script?: string; region?: string },
  entry: LanguageLookupResult['data'][string] | undefined,
  flagMode: FlagDisplayMode
): string[] {
  if (flagMode === 'none' || !entry) return [];
  if (parsed.region) return [parsed.region.toLowerCase()];
  if (parsed.script && entry.scriptFlags?.[parsed.script]) return entry.scriptFlags[parsed.script];
  return entry.flags ?? [];
}

function buildDisplayLanguages(data: LanguageLookupResult, flagMode: FlagDisplayMode): DisplayLanguage[] {
  return data.resolved.map(resolvedTag => {
    const parsed = parseTag(resolvedTag);
    const entry = data.data[parsed.lang];
    
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
    
    return {
      code: resolvedTag,
      name: entry?.data.name ?? resolvedTag,
      endonym,
      regionNameEnglish,
      regionNameNative,
      scriptNameEnglish,
      scriptNameLocal,
      flagCodes: getFlagsForEntry(parsed, entry, flagMode)
    };
  });
}

function collectFlagCodes(data: LanguageLookupResult): string[] {
  const codes = new Set<string>();
  for (const entry of Object.values(data.data)) {
    if (entry.flags) entry.flags.forEach(f => codes.add(f.toLowerCase()));
    if (entry.scriptFlags) {
      for (const scriptFlags of Object.values(entry.scriptFlags)) {
        scriptFlags.forEach(f => codes.add(f.toLowerCase()));
      }
    }
  }
  return Array.from(codes);
}

async function fetchFlag(code: string, apiUrl: string): Promise<string | null> {
  const response = await fetch(`${apiUrl}/flags/${code.toLowerCase()}`);
  if (!response.ok) return response.status === 404 ? null : null;
  return response.text();
}

async function fetchAllFlags(apiUrl: string): Promise<Record<string, string>> {
  const response = await fetch(`${apiUrl}/all-flags`);
  if (!response.ok) throw new Error(`Failed to fetch flags: HTTP ${response.status}`);
  return response.json();
}

async function fetchFlags(codes: string[], apiUrl: string): Promise<Record<string, string>> {
  const flags: Record<string, string> = {};
  const results = await Promise.all(codes.map(async code => {
    const svg = await fetchFlag(code, apiUrl);
    return { code: code.toLowerCase(), svg };
  }));
  for (const { code, svg } of results) {
    if (svg) flags[code] = svg;
  }
  return flags;
}

async function loadLanguageData(config: EmbedConfig): Promise<LanguageLookupResult> {
  const params = new URLSearchParams({
    l: config.languages.join(','),
    f: config.flagMode
  });
  
  const response = await fetch(`${config.apiUrl}/languages?${params}`);
  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Request failed' }));
    throw new Error(error.error || `HTTP ${response.status}`);
  }
  
  const data: LanguageLookupResult = await response.json();
  if (!data.resolved || data.resolved.length === 0) {
    throw new Error('Invalid response: no valid languages returned');
  }
  
  if (data.flags && Object.keys(data.flags).length > 0) return data;
  
  const flagCodes = collectFlagCodes(data);
  if (flagCodes.length === 0) return data;
  
  const flags = config.flagLoadMode === 'single'
    ? await fetchAllFlags(config.apiUrl)
    : await fetchFlags(flagCodes, config.apiUrl);
  
  return { ...data, flags };
}

function initInstance(el: HTMLElement): void {
  const config = parseConfig(el);
  
  if (config.languages.length === 0) {
    console.error('[CasholabLS] No languages provided');
    return;
  }
  
  let isOpen = false;
  let fetchedData: LanguageLookupResult | null = null;
  let isFetching = false;
  let error: Error | null = null;
  
  const wrapper = document.createElement('div');
  wrapper.className = 'ls-embed-wrapper';
  el.appendChild(wrapper);
  
  async function loadData(): Promise<void> {
    if (isFetching || fetchedData) return;
    isFetching = true;
    
    const updateUI = config.isModal ? updateModal : updateDropdown;
    updateUI({ isLoading: true });
    
    try {
      fetchedData = await loadLanguageData(config);
      error = null;
      const displayLanguages = buildDisplayLanguages(fetchedData, config.flagMode);
      updateUI({ languages: displayLanguages, flags: fetchedData.flags, isLoading: false });
    } catch (e) {
      error = e instanceof Error ? e : new Error(String(e));
      updateUI({ isLoading: false, error });
    } finally {
      isFetching = false;
    }
  }
  
  function handleSelect(code: string): void {
    if (config.callback && typeof (window as any)[config.callback] === 'function') {
      (window as any)[config.callback](code);
    }
  }
  
  function handleClose(): void {
    isOpen = false;
    if (config.isModal) {
      closeModal();
    } else {
      closeDropdown();
    }
  }
  
  function handleOpen(): void {
    if (isOpen) {
      handleClose();
      return;
    }
    
    isOpen = true;
    const displayLanguages = fetchedData ? buildDisplayLanguages(fetchedData, config.flagMode) : [];
    
    const opts = {
      languages: displayLanguages,
      flags: fetchedData?.flags,
      showEnglishName: config.showEnglishName,
      flagMode: config.flagMode,
      isLoading: isFetching || (!fetchedData && !error),
      error,
      onSelect: handleSelect,
      onClose: handleClose
    };
    
    if (config.isModal) {
      openModal(opts);
    } else {
      openDropdown(btn, opts);
    }
    
    if (!fetchedData && !isFetching) {
      loadData();
    }
  }
  
  function handleHover(): void {
    if (!fetchedData && !isFetching && !error) {
      loadData();
    }
  }
  
  const btn = createButton(config.buttonSize, handleHover, handleOpen);
  wrapper.appendChild(btn);
}

function init(): void {
  injectStyles();
  
  const targets = document.querySelectorAll('#casholab-ls, [casholab-ls]');
  targets.forEach(el => {
    if (el instanceof HTMLElement) {
      initInstance(el);
    }
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

