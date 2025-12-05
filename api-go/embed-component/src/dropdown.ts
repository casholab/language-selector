import { SearchIconSmall } from './icons';
import type { DisplayLanguage, FlagDisplayMode } from './types';

interface DropdownState {
  languages: DisplayLanguage[];
  flags?: Record<string, string>;
  showEnglishName: boolean;
  showFlags: boolean;
  isLoading: boolean;
  error: Error | null;
  searchTerm: string;
  selectedCode: string | null;
  onSelect: (code: string) => void;
  onClose: () => void;
}

let dropdownEl: HTMLDivElement | null = null;
let state: DropdownState | null = null;
let anchorEl: HTMLElement | null = null;
let cleanupClickOutside: (() => void) | null = null;

function svgToDataUri(svg: string): string {
  return 'data:image/svg+xml,' + encodeURIComponent(svg);
}

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

function renderOption(lang: DisplayLanguage, flags: Record<string, string> | undefined, showFlags: boolean, showEnglishName: boolean, isSelected: boolean): string {
  let flagImg = '';
  if (showFlags && lang.flagCodes.length > 0 && flags) {
    const svg = flags[lang.flagCodes[0]] || flags[lang.flagCodes[0].toLowerCase()];
    if (svg) flagImg = `<img class="ls-flag-sm" src="${svgToDataUri(svg)}" alt="">`;
  }
  
  const englishPart = showEnglishName && lang.endonym && lang.endonym.toLowerCase() !== lang.name.toLowerCase()
    ? `<span class="ls-dropdown-english">${lang.name}</span>`
    : '';
  
  let variantPart = '';
  if (lang.scriptNameLocal || lang.scriptNameEnglish) {
    let scriptText = lang.scriptNameLocal || '';
    if (lang.scriptNameLocal && lang.scriptNameEnglish && lang.scriptNameLocal.toLowerCase() !== lang.scriptNameEnglish.toLowerCase()) {
      scriptText += ' | ';
    }
    if (lang.scriptNameEnglish && (!lang.scriptNameLocal || lang.scriptNameLocal.toLowerCase() !== lang.scriptNameEnglish.toLowerCase())) {
      scriptText += lang.scriptNameEnglish;
    }
    variantPart += `<span class="ls-dropdown-variant">${scriptText}</span>`;
  }
  if (lang.regionNameNative || lang.regionNameEnglish) {
    let regionText = lang.regionNameNative || '';
    if (lang.regionNameNative && lang.regionNameEnglish && lang.regionNameNative.toLowerCase() !== lang.regionNameEnglish.toLowerCase()) {
      regionText += ' | ';
    }
    if (lang.regionNameEnglish && (!lang.regionNameNative || lang.regionNameNative.toLowerCase() !== lang.regionNameEnglish.toLowerCase())) {
      regionText += lang.regionNameEnglish;
    }
    variantPart += `<span class="ls-dropdown-variant">${regionText}</span>`;
  }
  
  return `<button class="ls-dropdown-option${isSelected ? ' selected' : ''}" type="button" data-code="${lang.code}">
    ${flagImg}
    <div class="ls-dropdown-option-text">
      <span class="ls-dropdown-native">${lang.endonym || lang.name}</span>
      ${englishPart}
    </div>
    ${variantPart ? `<div class="ls-dropdown-variant-container">${variantPart}</div>` : ''}
  </button>`;
}

function render(): void {
  if (!dropdownEl || !state) return;
  
  const filtered = filterLanguages(state.languages, state.searchTerm);
  const selectedLang = state.selectedCode ? state.languages.find(l => l.code === state.selectedCode) : null;
  
  let content: string;
  
  if (state.error) {
    content = `<div class="ls-dropdown-error"><p>Failed to load</p><p class="ls-error-details">${state.error.message}</p></div>`;
  } else {
    const loadingOverlay = state.isLoading ? '<div class="ls-dropdown-loading-overlay"><div class="ls-spinner-sm"></div></div>' : '';
    
    let listItems: string;
    if (state.languages.length > 0) {
      if (filtered.length === 0) {
        listItems = '<div class="ls-dropdown-empty">No languages found</div>';
      } else {
        listItems = filtered.map(l => renderOption(l, state!.flags, state!.showFlags, state!.showEnglishName && !!l.endonym && l.endonym !== l.name, selectedLang?.code === l.code)).join('');
      }
    } else {
      listItems = Array(5).fill('<div class="ls-dropdown-option-placeholder" style="padding:0.625rem 0.75rem;min-height:2.5rem;"></div>').join('');
    }
    
    content = `<div class="ls-dropdown-content">
      ${loadingOverlay}
      <div class="ls-search-compact">
        ${SearchIconSmall}
        <input type="text" placeholder="Search languages..." value="${state.searchTerm}" autofocus>
      </div>
      <div class="ls-dropdown-list">${listItems}</div>
    </div>`;
  }
  
  dropdownEl.innerHTML = content;
  
  const searchInput = dropdownEl.querySelector('.ls-search-compact input') as HTMLInputElement | null;
  if (searchInput) {
    searchInput.focus();
    searchInput.addEventListener('input', (e) => {
      if (state) {
        state.searchTerm = (e.target as HTMLInputElement).value;
        render();
      }
    });
    searchInput.addEventListener('keydown', handleKeydown);
  }
  
  dropdownEl.querySelectorAll('.ls-dropdown-option').forEach(el => {
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

function positionDropdown(): void {
  if (!dropdownEl || !anchorEl) return;
  
  const rect = dropdownEl.getBoundingClientRect();
  const anchorRect = anchorEl.getBoundingClientRect();
  const viewportHeight = window.innerHeight;
  const viewportWidth = window.innerWidth;
  
  const spaceBelow = viewportHeight - anchorRect.bottom;
  if (spaceBelow < rect.height && anchorRect.top > rect.height) {
    dropdownEl.classList.add('ls-dropdown-upward');
  }
  
  if (anchorRect.left + rect.width > viewportWidth) {
    dropdownEl.classList.add('ls-dropdown-right');
  }
}

export function openDropdown(anchor: HTMLElement, opts: {
  languages: DisplayLanguage[];
  flags?: Record<string, string>;
  showEnglishName: boolean;
  flagMode: FlagDisplayMode;
  isLoading: boolean;
  error: Error | null;
  onSelect: (code: string) => void;
  onClose: () => void;
}): void {
  if (dropdownEl) closeDropdown();
  
  anchorEl = anchor;
  dropdownEl = document.createElement('div');
  dropdownEl.className = 'ls-dropdown';
  anchor.parentElement?.appendChild(dropdownEl);
  
  state = {
    languages: opts.languages,
    flags: opts.flags,
    showEnglishName: opts.showEnglishName,
    showFlags: opts.flagMode !== 'none',
    isLoading: opts.isLoading,
    error: opts.error,
    searchTerm: '',
    selectedCode: null,
    onSelect: opts.onSelect,
    onClose: opts.onClose
  };
  
  render();
  positionDropdown();
  
  document.addEventListener('keydown', handleKeydown);
  
  setTimeout(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownEl && !dropdownEl.contains(e.target as Node) && !anchorEl?.contains(e.target as Node)) {
        opts.onClose();
      }
    };
    window.addEventListener('click', handleClickOutside);
    cleanupClickOutside = () => window.removeEventListener('click', handleClickOutside);
  }, 0);
}

export function updateDropdown(opts: { languages?: DisplayLanguage[]; flags?: Record<string, string>; isLoading?: boolean; error?: Error | null }): void {
  if (!state) return;
  if (opts.languages !== undefined) state.languages = opts.languages;
  if (opts.flags !== undefined) state.flags = opts.flags;
  if (opts.isLoading !== undefined) state.isLoading = opts.isLoading;
  if (opts.error !== undefined) state.error = opts.error;
  render();
}

export function closeDropdown(): void {
  document.removeEventListener('keydown', handleKeydown);
  cleanupClickOutside?.();
  cleanupClickOutside = null;
  if (dropdownEl) {
    dropdownEl.remove();
    dropdownEl = null;
  }
  anchorEl = null;
  state = null;
}

