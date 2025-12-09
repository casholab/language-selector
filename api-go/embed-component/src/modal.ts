import { LanguageIcon, XIcon, SearchIcon } from './icons';
import type { DisplayLanguage, FlagDisplayMode } from './types';

interface ModalState {
  languages: DisplayLanguage[];
  showEnglishName: boolean;
  showFlags: boolean;
  isLoading: boolean;
  error: Error | null;
  searchTerm: string;
  selectedCode: string | null;
  onSelect: (code: string) => void;
  onClose: () => void;
}

let modalEl: HTMLDivElement | null = null;
let state: ModalState | null = null;

function filterLanguages(languages: DisplayLanguage[], term: string): DisplayLanguage[] {
  if (!term) return languages;
  const t = term.toLowerCase();
  return languages.filter(l =>
    l.name.toLowerCase().includes(t) ||
    l.endonym.toLowerCase().includes(t) ||
    l.code.toLowerCase().includes(t) ||
    (l.regionNameEnglish && l.regionNameEnglish.toLowerCase().includes(t)) ||
    (l.regionNameNative && l.regionNameNative.toLowerCase().includes(t)) ||
    (l.scriptNameEnglish && l.scriptNameEnglish.toLowerCase().includes(t)) ||
    (l.scriptNameLocal && l.scriptNameLocal.toLowerCase().includes(t))
  );
}

function renderFlagDisplay(flagSvgDataUris: string[], size: 'sm' | 'md' | 'lg'): string {
  if (flagSvgDataUris.length === 0) return '';
  
  const layout = flagSvgDataUris.length > 2 ? 'grid' : flagSvgDataUris.length === 2 ? 'row' : 'single';
  const imgs = flagSvgDataUris.map(uri => `<img class="ls-flag" src="${uri}" alt="">`).join('');
  
  return `<div class="ls-flags ls-flags-${layout} ls-flags-${size}">${imgs}</div>`;
}

function renderSelectedDisplay(lang: DisplayLanguage, showFlags: boolean, showEnglishName: boolean): string {
  const scriptLocal = lang.scriptNameLocal ? `<span class="ls-selected-script-local">(${lang.scriptNameLocal})</span>` : '';
  const regionLocal = lang.regionNameNative ? `<span class="ls-selected-region-local">(${lang.regionNameNative})</span>` : '';
  
  let englishPart = '';
  if (showEnglishName) {
    let variant = '';
    if (lang.scriptNameEnglish && (!lang.scriptNameLocal || lang.scriptNameLocal.toLowerCase() !== lang.scriptNameEnglish.toLowerCase())) {
      variant += `(${lang.scriptNameEnglish}) `;
    }
    if (lang.regionNameEnglish && (!lang.regionNameNative || lang.regionNameNative.toLowerCase() !== lang.regionNameEnglish.toLowerCase())) {
      variant += lang.regionNameEnglish;
    }
    englishPart = `<div class="ls-selected-english"><span class="ls-selected-name">${lang.name}</span>${variant ? `<span class="ls-selected-variant">${variant}</span>` : ''}</div>`;
  }
  
  const flagPart = showFlags && lang.flagSvgDataUris.length > 0 ? renderFlagDisplay(lang.flagSvgDataUris, 'lg') : '';
  
  return `<div class="ls-selected">
    <div class="ls-selected-native">${lang.endonym || lang.name}${scriptLocal}${regionLocal}</div>
    ${englishPart}
    ${flagPart}
  </div>`;
}

function renderOption(lang: DisplayLanguage, showFlags: boolean, showEnglishName: boolean, isSelected: boolean): string {
  const flagPart = showFlags && lang.flagSvgDataUris.length > 0 ? renderFlagDisplay(lang.flagSvgDataUris, 'md') : '';
  
  const hasVariant = lang.regionNameNative || lang.regionNameEnglish || lang.scriptNameLocal || lang.scriptNameEnglish;
  
  let metaPart = '';
  if (hasVariant) {
    if (lang.regionNameNative || lang.regionNameEnglish) {
      const showRegionEnglish = showEnglishName && lang.regionNameEnglish && (!lang.regionNameNative || lang.regionNameNative.toLowerCase() !== lang.regionNameEnglish.toLowerCase());
      metaPart += `<div class="ls-option-meta">
        <div class="ls-meta-native">${lang.regionNameNative || ''}</div>
        ${showRegionEnglish ? `<div class="ls-meta-english">${lang.regionNameEnglish}</div>` : ''}
      </div>`;
    }
    if (lang.scriptNameLocal || lang.scriptNameEnglish) {
      const showScriptEnglish = showEnglishName && lang.scriptNameEnglish && (!lang.scriptNameLocal || lang.scriptNameLocal.toLowerCase() !== lang.scriptNameEnglish.toLowerCase());
      metaPart += `<div class="ls-option-meta">
        <div class="ls-meta-native">${lang.scriptNameLocal || ''}</div>
        ${showScriptEnglish ? `<div class="ls-meta-english">${lang.scriptNameEnglish}</div>` : ''}
      </div>`;
    }
  }
  
  const englishPart = showEnglishName && lang.endonym && lang.endonym !== lang.name
    ? `<div class="ls-option-english"><span class="ls-option-name">${lang.name}</span></div>`
    : '';
  
  return `<button class="ls-option${isSelected ? ' selected' : ''}" type="button" data-code="${lang.code}">
    ${flagPart}
    <div class="ls-option-content">
      <div class="ls-option-native">${lang.endonym || lang.name}</div>
      ${englishPart}
    </div>
    ${metaPart}
  </button>`;
}

function render(): void {
  if (!modalEl || !state) return;
  
  const currentState = state;
  const filtered = filterLanguages(currentState.languages, currentState.searchTerm);
  const selectedLang = currentState.selectedCode ? currentState.languages.find(l => l.code === currentState.selectedCode) : null;
  
  let content: string;
  
  if (state.error) {
    content = `<div class="ls-error"><p>Failed to load languages</p><p class="ls-error-details">${state.error.message}</p></div>`;
  } else {
    const loadingOverlay = state.isLoading ? '<div class="ls-loading-overlay"><div class="ls-spinner"></div></div>' : '';
    
    const selectedDisplay = selectedLang 
      ? renderSelectedDisplay(selectedLang, state.showFlags, state.showEnglishName && !!selectedLang.endonym && selectedLang.endonym !== selectedLang.name) + '<div class="ls-hr"></div>'
      : '';
    
    const listItems = state.languages.length > 0
      ? filtered.map(l => renderOption(l, state!.showFlags, state!.showEnglishName && !!l.endonym && l.endonym !== l.name, selectedLang?.code === l.code)).join('')
      : Array(10).fill('<div class="ls-option-placeholder" style="padding:var(--ls-padding);background:var(--ls-bg);border:1px solid var(--ls-border);border-radius:var(--ls-radius);width:100%;max-width:360px;height:58px;"></div>').join('');
    
    content = `<div class="ls-content">
      ${loadingOverlay}
      ${selectedDisplay}
      <label class="ls-search">
        ${SearchIcon}
        <input type="text" placeholder="Search languages..." value="${state.searchTerm}">
      </label>
      <div class="ls-list">${listItems}</div>
    </div>`;
  }
  
  modalEl.innerHTML = `<div class="ls-modal-outer">
    <div class="ls-modal-overlay"></div>
    <div class="ls-modal-container">
      <div class="ls-modal-body">
        <button class="ls-modal-close" type="button">${XIcon}</button>
        <div class="ls-container">
          <header class="ls-header">${LanguageIcon}<span>Select a Language</span></header>
          ${content}
        </div>
      </div>
    </div>
  </div>`;
  
  modalEl.querySelector('.ls-modal-overlay')?.addEventListener('click', state.onClose);
  modalEl.querySelector('.ls-modal-close')?.addEventListener('click', state.onClose);
  
  const searchInput = modalEl.querySelector('.ls-search input') as HTMLInputElement | null;
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      if (state) {
        state.searchTerm = (e.target as HTMLInputElement).value;
        render();
      }
    });
  }
  
  modalEl.querySelectorAll('.ls-option').forEach(el => {
    el.addEventListener('click', () => {
      const code = el.getAttribute('data-code');
      if (code && state) {
        state.selectedCode = code;
        state.onSelect(code);
        state.onClose();
      }
    });
  });
}

function handleKeydown(e: KeyboardEvent): void {
  if (e.key === 'Escape' && state) {
    state.onClose();
  }
}

export function openModal(opts: {
  languages: DisplayLanguage[];
  showEnglishName: boolean;
  flagMode: FlagDisplayMode;
  isLoading: boolean;
  error: Error | null;
  onSelect: (code: string) => void;
  onClose: () => void;
}): void {
  if (modalEl) closeModal();
  
  modalEl = document.createElement('div');
  document.body.appendChild(modalEl);
  
  state = {
    languages: opts.languages,
    showEnglishName: opts.showEnglishName,
    showFlags: opts.flagMode !== 'none',
    isLoading: opts.isLoading,
    error: opts.error,
    searchTerm: '',
    selectedCode: null,
    onSelect: opts.onSelect,
    onClose: opts.onClose
  };
  
  document.addEventListener('keydown', handleKeydown);
  render();
}

export function updateModal(opts: { languages?: DisplayLanguage[]; isLoading?: boolean; error?: Error | null }): void {
  if (!state) return;
  if (opts.languages !== undefined) state.languages = opts.languages;
  if (opts.isLoading !== undefined) state.isLoading = opts.isLoading;
  if (opts.error !== undefined) state.error = opts.error;
  render();
}

export function closeModal(): void {
  document.removeEventListener('keydown', handleKeydown);
  if (modalEl) {
    modalEl.remove();
    modalEl = null;
  }
  state = null;
}
