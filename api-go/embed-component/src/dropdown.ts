import { SearchIconSmall } from './icons';
import type { DisplayLanguage, FlagDisplayMode } from './types';

interface DropdownState {
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

let dropdownEl: HTMLDivElement | null = null;
let pixelEl: HTMLSpanElement | null = null;
let state: DropdownState | null = null;
let anchorEl: HTMLElement | null = null;
let cleanupClickOutside: (() => void) | null = null;

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

function renderOption(lang: DisplayLanguage, showFlags: boolean, showEnglishName: boolean, isSelected: boolean): string {
  let flagImg = '';
  if (showFlags && lang.flagSvgDataUris.length > 0) {
    flagImg = `<img class="ls-flag-sm" src="${lang.flagSvgDataUris[0]}" alt="">`;
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
  
  const currentState = state;
  const filtered = filterLanguages(currentState.languages, currentState.searchTerm);
  const selectedLang = currentState.selectedCode ? currentState.languages.find(l => l.code === currentState.selectedCode) : null;
  
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
        listItems = filtered.map(l => renderOption(l, state!.showFlags, state!.showEnglishName && !!l.endonym && l.endonym !== l.name, selectedLang?.code === l.code)).join('');
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
  if (!dropdownEl || !pixelEl) return;
  
  const pixelRect = pixelEl.getBoundingClientRect();
  const dropdownRect = dropdownEl.getBoundingClientRect();
  const viewportHeight = document.documentElement.clientHeight;
  const viewportWidth = document.documentElement.clientWidth;
  const dropdownHeight = dropdownRect.height;
  const dropdownWidth = dropdownRect.width;
  const topLeftY = pixelRect.top;
  const topLeftX = pixelRect.left;

  const spaceBelow = viewportHeight - topLeftY;
  if (spaceBelow < dropdownHeight && topLeftY > dropdownHeight) {
    dropdownEl.classList.add('ls-dropdown-upward');
  }

  const spaceRight = viewportWidth - topLeftX;
  const spaceLeft = topLeftX;

  if (spaceRight < dropdownWidth && spaceLeft < dropdownWidth) {
    dropdownEl.classList.remove('ls-dropdown-right');
    dropdownEl.style.transform = `translateX(${-topLeftX}px)`;
  } else if (spaceRight < dropdownWidth) {
    dropdownEl.classList.add('ls-dropdown-right');
    dropdownEl.style.transform = '';
  } else {
    dropdownEl.classList.remove('ls-dropdown-right');
    dropdownEl.style.transform = '';
  }
}

export function openDropdown(anchor: HTMLElement, opts: {
  languages: DisplayLanguage[];
  showEnglishName: boolean;
  flagMode: FlagDisplayMode;
  isLoading: boolean;
  error: Error | null;
  onSelect: (code: string) => void;
  onClose: () => void;
}): void {
  if (dropdownEl) closeDropdown();
  
  anchorEl = anchor;
  
  pixelEl = document.createElement('span');
  pixelEl.className = 'ls-pixel';
  anchor.parentElement?.appendChild(pixelEl);
  
  dropdownEl = document.createElement('div');
  dropdownEl.className = 'ls-dropdown';
  anchor.parentElement?.appendChild(dropdownEl);
  
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

export function updateDropdown(opts: { languages?: DisplayLanguage[]; isLoading?: boolean; error?: Error | null }): void {
  if (!state) return;
  if (opts.languages !== undefined) state.languages = opts.languages;
  if (opts.isLoading !== undefined) state.isLoading = opts.isLoading;
  if (opts.error !== undefined) state.error = opts.error;
  render();
}

export function closeDropdown(): void {
  document.removeEventListener('keydown', handleKeydown);
  cleanupClickOutside?.();
  cleanupClickOutside = null;
  if (pixelEl) {
    pixelEl.remove();
    pixelEl = null;
  }
  if (dropdownEl) {
    dropdownEl.remove();
    dropdownEl = null;
  }
  anchorEl = null;
  state = null;
}
