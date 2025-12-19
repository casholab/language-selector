import { LanguageIcon, ChevronDownIcon } from './icons';
import type { ButtonSize, DisplayLanguage } from './types';

export interface ButtonOptions {
  size: ButtonSize;
  text: string;
  displaySelected: boolean;
  showFlag: boolean;
  selectedLanguage: DisplayLanguage | null;
  onHover: () => void;
  onClick: () => void;
}

export function createButton(options: ButtonOptions): HTMLButtonElement {
  const btn = document.createElement('button');
  btn.className = options.size === 'sm' ? 'ls-btn sm' : 'ls-btn';
  btn.type = 'button';
  
  updateButtonContent(btn, options);
  
  btn.addEventListener('mouseenter', options.onHover);
  btn.addEventListener('click', options.onClick);
  
  return btn;
}

export function updateButtonContent(btn: HTMLButtonElement, options: ButtonOptions): void {
  const { size, text, displaySelected, showFlag, selectedLanguage } = options;
  
  const displayText = displaySelected && selectedLanguage
    ? selectedLanguage.endonym || selectedLanguage.name
    : text;
  
  const flagSrc = displaySelected && showFlag && selectedLanguage?.flagSvgDataUris?.length
    ? selectedLanguage.flagSvgDataUris[0]
    : null;
  
  const hasSelection = displaySelected && selectedLanguage;
  
  if (size === 'lg') {
    const iconHtml = hasSelection && flagSrc
      ? `<img class="ls-btn-flag" src="${flagSrc}" alt="" />`
      : LanguageIcon;
    btn.innerHTML = `${iconHtml}<span>${displayText}</span>${ChevronDownIcon}`;
  } else {
    const flagHtml = hasSelection && flagSrc
      ? `<img class="ls-btn-flag" src="${flagSrc}" alt="" />`
      : '';
    btn.innerHTML = `${LanguageIcon}${flagHtml}`;
  }
}

