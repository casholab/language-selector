import { LanguageIcon, ChevronDownIcon } from './icons';
import type { ButtonSize } from './types';

export function createButton(size: ButtonSize, onHover: () => void, onClick: () => void): HTMLButtonElement {
  const btn = document.createElement('button');
  btn.className = size === 'sm' ? 'ls-btn sm' : 'ls-btn';
  btn.type = 'button';
  
  btn.innerHTML = size === 'lg' 
    ? `${LanguageIcon}<span>Localize</span>${ChevronDownIcon}`
    : LanguageIcon;
  
  btn.addEventListener('mouseenter', onHover);
  btn.addEventListener('click', onClick);
  
  return btn;
}

