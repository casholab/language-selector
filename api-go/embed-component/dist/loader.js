(function(){"use strict";const j=`
:root {
  color-scheme: light dark;
  --ls-light-bg: #f3f3f3;
  --ls-light-bg-hover: #f4f4f5;
  --ls-light-bg-selected: #eff6ff;
  --ls-light-fg: #18181b;
  --ls-light-fg-muted: #71717a;
  --ls-light-border: #e4e4e7;
  --ls-light-border-hover: #a1a1aa;
  --ls-light-btn-bg: #ffffff;
  --ls-light-btn-bg-hover: #f4f4f5;
  --ls-light-btn-border: #e4e4e7;
  --ls-light-input-bg: #fafafa;
  --ls-light-input-border: #e4e4e7;
  --ls-light-modal-bg: #ffffff;
  --ls-light-modal-border: #e4e4e7;
  --ls-light-modal-overlay: rgba(0, 0, 0, 0.4);
  --ls-light-modal-shadow: 0 20px 50px -12px rgba(0, 0, 0, 0.25), 0 8px 20px -8px rgba(0, 0, 0, 0.1);
  --ls-dark-bg: #27272a;
  --ls-dark-bg-hover: #3f3f46;
  --ls-dark-bg-selected: #3f3f46;
  --ls-dark-fg: #fafafa;
  --ls-dark-fg-muted: #a1a1aa;
  --ls-dark-border: #3f3f46;
  --ls-dark-border-hover: #52525b;
  --ls-dark-btn-bg: #18181b;
  --ls-dark-btn-bg-hover: #27272a;
  --ls-dark-btn-border: #3f3f46;
  --ls-dark-input-bg: #18181b;
  --ls-dark-input-border: #3f3f46;
  --ls-dark-modal-bg: #09090b;
  --ls-dark-modal-border: #27272a;
  --ls-dark-modal-overlay: rgba(0, 0, 0, 0.7);
  --ls-dark-modal-shadow: 0 20px 50px -12px rgba(0, 0, 0, 0.6), 0 8px 20px -8px rgba(0, 0, 0, 0.4);
  --ls-border-selected: #3b82f6;
  --ls-border-focus: #3b82f6;
  --ls-radius: 0.5rem;
  --ls-radius-lg: 0.75rem;
  --ls-gap: 0.75rem;
  --ls-padding: 0.75rem;
  --ls-bg: var(--ls-light-bg);
  --ls-bg-hover: var(--ls-light-bg-hover);
  --ls-bg-selected: var(--ls-light-bg-selected);
  --ls-fg: var(--ls-light-fg);
  --ls-fg-muted: var(--ls-light-fg-muted);
  --ls-border: var(--ls-light-border);
  --ls-border-hover: var(--ls-light-border-hover);
  --ls-btn-bg: var(--ls-light-btn-bg);
  --ls-btn-bg-hover: var(--ls-light-btn-bg-hover);
  --ls-btn-border: var(--ls-light-btn-border);
  --ls-input-bg: var(--ls-light-input-bg);
  --ls-input-border: var(--ls-light-input-border);
  --ls-modal-bg: var(--ls-light-modal-bg);
  --ls-modal-border: var(--ls-light-modal-border);
  --ls-modal-overlay: var(--ls-light-modal-overlay);
  --ls-modal-shadow: var(--ls-light-modal-shadow);
}

@media (prefers-color-scheme: dark) {
  :root {
    --ls-bg: var(--ls-dark-bg);
    --ls-bg-hover: var(--ls-dark-bg-hover);
    --ls-bg-selected: var(--ls-dark-bg-selected);
    --ls-fg: var(--ls-dark-fg);
    --ls-fg-muted: var(--ls-dark-fg-muted);
    --ls-border: var(--ls-dark-border);
    --ls-border-hover: var(--ls-dark-border-hover);
    --ls-btn-bg: var(--ls-dark-btn-bg);
    --ls-btn-bg-hover: var(--ls-dark-btn-bg-hover);
    --ls-btn-border: var(--ls-dark-btn-border);
    --ls-input-bg: var(--ls-dark-input-bg);
    --ls-input-border: var(--ls-dark-input-border);
    --ls-modal-bg: var(--ls-dark-modal-bg);
    --ls-modal-border: var(--ls-dark-modal-border);
    --ls-modal-overlay: var(--ls-dark-modal-overlay);
    --ls-modal-shadow: var(--ls-dark-modal-shadow);
  }
}

.dark {
  --ls-bg: var(--ls-dark-bg);
  --ls-bg-hover: var(--ls-dark-bg-hover);
  --ls-bg-selected: var(--ls-dark-bg-selected);
  --ls-fg: var(--ls-dark-fg);
  --ls-fg-muted: var(--ls-dark-fg-muted);
  --ls-border: var(--ls-dark-border);
  --ls-border-hover: var(--ls-dark-border-hover);
  --ls-btn-bg: var(--ls-dark-btn-bg);
  --ls-btn-bg-hover: var(--ls-dark-btn-bg-hover);
  --ls-btn-border: var(--ls-dark-btn-border);
  --ls-input-bg: var(--ls-dark-input-bg);
  --ls-input-border: var(--ls-dark-input-border);
  --ls-modal-bg: var(--ls-dark-modal-bg);
  --ls-modal-border: var(--ls-dark-modal-border);
  --ls-modal-overlay: var(--ls-dark-modal-overlay);
  --ls-modal-shadow: var(--ls-dark-modal-shadow);
}

.light {
  --ls-bg: var(--ls-light-bg);
  --ls-bg-hover: var(--ls-light-bg-hover);
  --ls-bg-selected: var(--ls-light-bg-selected);
  --ls-fg: var(--ls-light-fg);
  --ls-fg-muted: var(--ls-light-fg-muted);
  --ls-border: var(--ls-light-border);
  --ls-border-hover: var(--ls-light-border-hover);
  --ls-btn-bg: var(--ls-light-btn-bg);
  --ls-btn-bg-hover: var(--ls-light-btn-bg-hover);
  --ls-btn-border: var(--ls-light-btn-border);
  --ls-input-bg: var(--ls-light-input-bg);
  --ls-input-border: var(--ls-light-input-border);
  --ls-modal-bg: var(--ls-light-modal-bg);
  --ls-modal-border: var(--ls-light-modal-border);
  --ls-modal-overlay: var(--ls-light-modal-overlay);
  --ls-modal-shadow: var(--ls-light-modal-shadow);
}

.ls-embed-wrapper {
  position: relative;
  display: inline-block;
}

.ls-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.875rem;
  background: var(--ls-btn-bg);
  border: 1px solid var(--ls-btn-border);
  border-radius: var(--ls-radius);
  color: var(--ls-fg);
  font-size: 0.9375rem;
  font-weight: 500;
  cursor: pointer;
  white-space: nowrap;
  transition: background-color 0.15s, border-color 0.15s;
  font-family: inherit;
}

.ls-btn:hover {
  background: var(--ls-btn-bg-hover);
  border-color: var(--ls-border-hover);
}

.ls-btn:focus-visible {
  outline: 2px solid var(--ls-border-focus);
  outline-offset: 2px;
}

.ls-btn.sm {
  padding: 0.5rem;
}

.ls-modal-outer {
  z-index: 1000;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.ls-modal-overlay {
  z-index: 1000;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  background: var(--ls-modal-overlay);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  animation: ls-fade-in 0.1s ease-out;
}

.ls-modal-container {
  overflow-y: auto;
  scrollbar-width: none;
  pointer-events: none;
  position: relative;
  padding: 2rem;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  z-index: 1001;
}

.ls-modal-body {
  height: fit-content;
  max-width: 90%;
  width: 800px;
  pointer-events: all;
  position: relative;
  background: var(--ls-modal-bg);
  border: 1px solid var(--ls-modal-border);
  border-radius: var(--ls-radius-lg);
  box-shadow: var(--ls-modal-shadow);
  padding: 1.25rem;
  animation: ls-scale-in 0.2s ease-out;
}

@media (max-width: 640px) {
  .ls-modal-container {
    padding-right: unset;
    padding-left: unset;
  }
}

.ls-modal-close {
  position: absolute;
  z-index: 2;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  cursor: pointer;
  border-radius: 50%;
  color: var(--ls-fg);
  padding: 0.375rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.15s;
}

.ls-modal-close:hover {
  background: var(--ls-bg-hover);
}

.ls-container {
  display: flex;
  flex-direction: column;
}

.ls-content {
  position: relative;
}

.ls-header {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-size: 1.125rem;
  color: var(--ls-fg);
  margin-bottom: 1rem;
}

.ls-search {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem;
  background: var(--ls-input-bg);
  border: 1px solid var(--ls-input-border);
  border-radius: var(--ls-radius);
  color: var(--ls-fg-muted);
  transition: border-color 0.15s, box-shadow 0.15s;
  width: 400px;
  max-width: 100%;
  margin: 0 auto 1rem;
}

.ls-search:focus-within {
  border-color: var(--ls-border-focus);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--ls-border-focus) 20%, transparent);
}

.ls-search input {
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  font-size: 0.9375rem;
  color: var(--ls-fg);
  font-family: inherit;
}

.ls-search input::placeholder {
  color: var(--ls-fg-muted);
}

.ls-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.5rem 1rem;
  scrollbar-color: var(--ls-border) transparent;
}

.ls-option {
  display: flex;
  align-items: end;
  gap: 0.75rem;
  padding: var(--ls-padding);
  background: var(--ls-bg);
  border: 1px solid var(--ls-border);
  border-radius: var(--ls-radius);
  cursor: pointer;
  text-align: left;
  width: 100%;
  max-width: 360px;
  font-family: inherit;
}

.ls-option:hover {
  background: var(--ls-bg-hover);
  border-color: var(--ls-border-hover);
}

.ls-option.selected {
  background: var(--ls-bg-selected);
  border-color: var(--ls-border-selected);
}

.ls-option-content {
  margin: auto 0;
}

.ls-option-native, .ls-option-english {
  text-transform: capitalize;
}

.ls-option-native {
  font-weight: 500;
  color: var(--ls-fg);
  font-size: 1rem;
}

.ls-option-english {
  font-size: 0.8125rem;
  color: var(--ls-fg-muted);
}

.ls-option-meta {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  min-width: 50px;
}

.ls-meta-native {
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--ls-fg);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.3;
  min-height: 1em;
}

.ls-meta-english {
  font-size: 0.6875rem;
  color: var(--ls-fg-muted);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.3;
  min-height: 1em;
}

.ls-flags {
  flex-shrink: 0;
}

.ls-flag {
  display: block;
  object-fit: contain;
  border-radius: 5%;
  filter: drop-shadow(0 0 1px var(--ls-border));
}

.ls-flags-sm.ls-flags-single { width: 20px; height: 14px; }
.ls-flags-sm.ls-flags-single .ls-flag { width: 20px; height: 14px; border-radius: 2px; }

.ls-flags-md { margin: auto 0; }
.ls-flags-md.ls-flags-single { width: 32px; height: 22px; }
.ls-flags-md.ls-flags-single .ls-flag { width: 32px; height: 22px; }
.ls-flags-md.ls-flags-row { display: flex; gap: 6px; height: 22px; }
.ls-flags-md.ls-flags-row .ls-flag { height: 22px; max-width: 36px; }
.ls-flags-md.ls-flags-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 6px; height: 40px; }
.ls-flags-md.ls-flags-grid .ls-flag { height: 16px; max-width: 24px; }

.ls-flags-lg { display: flex; flex-wrap: wrap; justify-content: center; gap: 0.5rem; }
.ls-flags-lg .ls-flag { height: 1.5rem; }

.ls-selected {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 0.25rem;
  padding-bottom: 0.75rem;
  margin-bottom: 1rem;
}

.ls-selected-native {
  font-weight: 600;
  font-size: 2rem;
  color: var(--ls-fg);
}

.ls-selected-english {
  font-size: 1.25rem;
  color: var(--ls-fg-muted);
}

.ls-selected-script-local, .ls-selected-region-local {
  opacity: 0.75;
  margin-left: 0.25rem;
}

.ls-hr {
  width: 100%;
  border: none;
  outline: none;
  height: 1px;
  background-color: var(--ls-border);
  margin-top: 0.5rem;
  margin-bottom: 1rem;
}

.ls-loading-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: color-mix(in srgb, var(--ls-modal-bg) 70%, transparent);
  z-index: 10;
  opacity: 0;
  animation: ls-fade-in 0.3s ease-out 0.15s forwards;
}

.ls-spinner {
  width: 32px;
  height: 32px;
  border: 3px solid var(--ls-border);
  border-top-color: var(--ls-fg);
  border-radius: 50%;
  animation: ls-spin 0.8s linear infinite;
}

.ls-error {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 2rem 1rem;
  color: var(--ls-fg-muted);
}

.ls-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  width: 280px;
  max-height: 360px;
  background: var(--ls-modal-bg);
  border: 1px solid var(--ls-border);
  border-radius: var(--ls-radius);
  box-shadow: 0 8px 24px -4px rgba(0, 0, 0, 0.15), 0 4px 8px -2px rgba(0, 0, 0, 0.1);
  z-index: 100;
  margin-top: 4px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.ls-dropdown-upward {
  top: auto;
  bottom: 100%;
  margin-top: 0;
  margin-bottom: 4px;
}

.ls-dropdown-right {
  left: auto;
  right: 0;
}

.ls-dropdown-content {
  position: relative;
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0;
}

.ls-dropdown-loading-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: color-mix(in srgb, var(--ls-modal-bg) 70%, transparent);
  z-index: 10;
  opacity: 0;
  animation: ls-fade-in 0.3s ease-out 0.15s forwards;
}

.ls-search-compact {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.625rem 0.75rem;
  border-bottom: 1px solid var(--ls-border);
  color: var(--ls-fg-muted);
}

.ls-search-compact input {
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  font-size: 0.875rem;
  color: var(--ls-fg);
  font-family: inherit;
}

.ls-search-compact input::placeholder {
  color: var(--ls-fg-muted);
}

.ls-dropdown-list {
  flex: 1;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: var(--ls-border) transparent;
}

.ls-dropdown-empty {
  padding: 1.5rem 1rem;
  text-align: center;
  color: var(--ls-fg-muted);
  font-size: 0.875rem;
}

.ls-dropdown-option {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 0.625rem;
  padding: 0.625rem 0.75rem;
  border: none;
  background: transparent;
  text-align: left;
  cursor: pointer;
  transition: background-color 0.1s;
  font-family: inherit;
}

.ls-dropdown-option:hover {
  background: var(--ls-bg-hover);
}

.ls-dropdown-option.selected {
  background: var(--ls-bg-selected);
}

.ls-flag-sm {
  height: 20px;
  max-width: 40px;
  object-fit: contain;
  border-radius: 2px;
  box-shadow: 0 0 0 1px var(--ls-border);
}

.ls-dropdown-option-text {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.125rem;
  flex-shrink: 0;
  width: fit-content;
}

.ls-dropdown-native {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--ls-fg);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.ls-dropdown-english {
  font-size: 0.75rem;
  color: var(--ls-fg-muted);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.ls-dropdown-variant-container {
  display: flex;
  flex-direction: column;
  gap: 0.125rem;
  align-items: flex-end;
}

.ls-dropdown-variant {
  flex-shrink: 0;
  font-size: 0.6875rem;
  color: var(--ls-fg-muted);
  padding: 0.125rem 0.375rem;
  background: var(--ls-bg);
  border-radius: 0.25rem;
  width: fit-content;
}

.ls-spinner-sm {
  width: 16px;
  height: 16px;
  border: 2px solid var(--ls-border);
  border-top-color: var(--ls-fg);
  border-radius: 50%;
  animation: ls-spin 0.8s linear infinite;
}

@keyframes ls-fade-in {
  to { opacity: 1; }
}

@keyframes ls-scale-in {
  from { transform: scale(0.95); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}

@keyframes ls-spin {
  to { transform: rotate(360deg); }
}
`;function F(){if(document.getElementById("casholab-ls-styles"))return;const e=document.createElement("style");e.id="casholab-ls-styles",e.textContent=j,document.head.appendChild(e)}const y='<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 400 364" fill="none"><path d="M269.958 133.006C277.449 129.385 286.184 129.385 293.675 133.006L293.675 133.006C300.193 136.157 303.727 141.647 305.482 144.6C306.931 147.038 308.409 150.006 309.877 153.053L311.339 156.108L311.34 156.109L363.435 265.144L363.436 265.145L398.217 337.944C402.549 347.011 398.717 357.878 389.658 362.215C380.6 366.551 369.745 362.716 365.412 353.648L335.575 291.197H228.058L198.221 353.648C193.888 362.716 183.033 366.551 173.974 362.215C164.915 357.878 161.084 347.011 165.416 337.944L252.293 156.109L252.293 156.108C254.236 152.044 256.219 147.85 258.15 144.6C259.905 141.647 263.44 136.156 269.958 133.006ZM109.093 18.1996C109.093 8.14815 117.233 0 127.274 0C137.315 0 145.455 8.14815 145.455 18.1996V36.3992H236.363C246.404 36.3992 254.544 44.5479 254.544 54.5994C254.544 64.6508 246.404 72.799 236.363 72.799H205.968C196.654 116.969 179.546 157.739 155.723 193.585C160.911 196.781 166.067 199.538 171.088 201.796C180.247 205.915 184.337 216.687 180.221 225.856C176.106 235.025 165.345 239.118 156.186 234.999C148.681 231.624 141.196 227.516 133.88 222.837C104.662 257.777 68.3185 286.581 26.2765 307.495C17.2844 311.968 6.37227 308.297 1.90357 299.296C-2.56499 290.295 1.1022 279.372 10.0943 274.898C47.1711 256.454 79.1804 231.207 104.999 200.661C84.2915 181.895 66.1749 158.631 55.9818 134.482C52.0737 125.223 56.4038 114.546 65.6533 110.634C74.9029 106.722 85.5694 111.056 89.4776 120.315C96.8424 137.763 110.426 155.897 126.838 171.313C146.005 141.934 160.241 108.778 168.712 72.799H18.1854C8.1441 72.799 0.00420549 64.6508 0.00410879 54.5994C0.00410879 44.5479 8.14404 36.3992 18.1854 36.3992H109.093V18.1996ZM245.449 254.797H318.183L281.816 178.68L245.449 254.797Z" fill="currentColor"/></svg>',A='<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>',T='<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>',D='<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 360 360" fill="none"><path d="M288 162C288 92.4121 231.588 35.9998 162 35.9997C92.4121 35.9997 35.9997 92.4121 35.9997 162C35.9998 231.588 92.4121 288 162 288C231.588 288 288 231.588 288 162ZM324 162C324 200.128 310.827 235.18 288.786 262.852L354.774 329.318C361.778 336.372 361.737 347.77 354.682 354.774C347.627 361.778 336.23 361.737 329.226 354.682L263.382 288.362C235.628 310.658 200.372 324 162 324C72.5299 324 9.79709e-05 251.471 0 162C0 72.5298 72.5298 0 162 0C251.471 9.79946e-05 324 72.5299 324 162Z" fill="currentColor"/></svg>',I='<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 360 360" fill="none"><path d="M288 162C288 92.4121 231.588 35.9998 162 35.9997C92.4121 35.9997 35.9997 92.4121 35.9997 162C35.9998 231.588 92.4121 288 162 288C231.588 288 288 231.588 288 162ZM324 162C324 200.128 310.827 235.18 288.786 262.852L354.774 329.318C361.778 336.372 361.737 347.77 354.682 354.774C347.627 361.778 336.23 361.737 329.226 354.682L263.382 288.362C235.628 310.658 200.372 324 162 324C72.5299 324 9.79709e-05 251.471 0 162C0 72.5298 72.5298 0 162 0C251.471 9.79946e-05 324 72.5299 324 162Z" fill="currentColor"/></svg>';function H(e,o,r){const s=document.createElement("button");return s.className=e==="sm"?"ls-btn sm":"ls-btn",s.type="button",s.innerHTML=e==="lg"?`${y}<span>Localize</span>${A}`:y,s.addEventListener("mouseenter",o),s.addEventListener("click",r),s}let f=null,t=null;function B(e){return"data:image/svg+xml,"+encodeURIComponent(e)}function P(e,o){if(!o)return e;const r=o.toLowerCase();return e.filter(s=>s.name.toLowerCase().includes(r)||s.endonym.toLowerCase().includes(r)||s.code.toLowerCase().includes(r)||s.regionNameEnglish&&s.regionNameEnglish.toLowerCase().includes(r)||s.regionNameNative&&s.regionNameNative.toLowerCase().includes(r)||s.scriptNameEnglish&&s.scriptNameEnglish.toLowerCase().includes(r)||s.scriptNameLocal&&s.scriptNameLocal.toLowerCase().includes(r))}function N(e,o,r){if(e.length===0||!o)return"";const s=e.length>2?"grid":e.length===2?"row":"single",l=e.map(a=>{const i=o[a]||o[a.toLowerCase()];return i?`<img class="ls-flag" src="${B(i)}" alt="" title="${a}">`:""}).join("");return`<div class="ls-flags ls-flags-${s} ls-flags-${r}">${l}</div>`}function U(e,o,r,s){const l=e.scriptNameLocal?`<span class="ls-selected-script-local">(${e.scriptNameLocal})</span>`:"",a=e.regionNameNative?`<span class="ls-selected-region-local">(${e.regionNameNative})</span>`:"";let i="";if(s){let d="";e.scriptNameEnglish&&(!e.scriptNameLocal||e.scriptNameLocal.toLowerCase()!==e.scriptNameEnglish.toLowerCase())&&(d+=`(${e.scriptNameEnglish}) `),e.regionNameEnglish&&(!e.regionNameNative||e.regionNameNative.toLowerCase()!==e.regionNameEnglish.toLowerCase())&&(d+=e.regionNameEnglish),i=`<div class="ls-selected-english"><span class="ls-selected-name">${e.name}</span>${d?`<span class="ls-selected-variant">${d}</span>`:""}</div>`}const c=r&&e.flagCodes.length>0&&o?N(e.flagCodes,o,"lg"):"";return`<div class="ls-selected">
    <div class="ls-selected-native">${e.endonym||e.name}${l}${a}</div>
    ${i}
    ${c}
  </div>`}function O(e,o,r,s,l){const a=r&&e.flagCodes.length>0&&o?N(e.flagCodes,o,"md"):"",i=e.regionNameNative||e.regionNameEnglish||e.scriptNameLocal||e.scriptNameEnglish;let c="";if(i){if(e.regionNameNative||e.regionNameEnglish){const m=s&&e.regionNameEnglish&&(!e.regionNameNative||e.regionNameNative.toLowerCase()!==e.regionNameEnglish.toLowerCase());c+=`<div class="ls-option-meta">
        <div class="ls-meta-native">${e.regionNameNative||""}</div>
        ${m?`<div class="ls-meta-english">${e.regionNameEnglish}</div>`:""}
      </div>`}if(e.scriptNameLocal||e.scriptNameEnglish){const m=s&&e.scriptNameEnglish&&(!e.scriptNameLocal||e.scriptNameLocal.toLowerCase()!==e.scriptNameEnglish.toLowerCase());c+=`<div class="ls-option-meta">
        <div class="ls-meta-native">${e.scriptNameLocal||""}</div>
        ${m?`<div class="ls-meta-english">${e.scriptNameEnglish}</div>`:""}
      </div>`}}const d=s&&e.endonym&&e.endonym!==e.name?`<div class="ls-option-english"><span class="ls-option-name">${e.name}</span></div>`:"";return`<button class="ls-option${l?" selected":""}" type="button" data-code="${e.code}">
    ${a}
    <div class="ls-option-content">
      <div class="ls-option-native">${e.endonym||e.name}</div>
      ${d}
    </div>
    ${c}
  </button>`}function C(){var l,a;if(!f||!t)return;const e=P(t.languages,t.searchTerm),o=t.selectedCode?t.languages.find(i=>i.code===t.selectedCode):null;let r;if(t.error)r=`<div class="ls-error"><p>Failed to load languages</p><p class="ls-error-details">${t.error.message}</p></div>`;else{const i=t.isLoading?'<div class="ls-loading-overlay"><div class="ls-spinner"></div></div>':"",c=o?U(o,t.flags,t.showFlags,t.showEnglishName&&!!o.endonym&&o.endonym!==o.name)+'<div class="ls-hr"></div>':"",d=t.languages.length>0?e.map(m=>O(m,t.flags,t.showFlags,t.showEnglishName&&!!m.endonym&&m.endonym!==m.name,(o==null?void 0:o.code)===m.code)).join(""):Array(10).fill('<div class="ls-option-placeholder" style="padding:var(--ls-padding);background:var(--ls-bg);border:1px solid var(--ls-border);border-radius:var(--ls-radius);width:100%;max-width:360px;height:58px;"></div>').join("");r=`<div class="ls-content">
      ${i}
      ${c}
      <label class="ls-search">
        ${D}
        <input type="text" placeholder="Search languages..." value="${t.searchTerm}">
      </label>
      <div class="ls-list">${d}</div>
    </div>`}f.innerHTML=`<div class="ls-modal-outer">
    <div class="ls-modal-overlay"></div>
    <div class="ls-modal-container">
      <div class="ls-modal-body">
        <button class="ls-modal-close" type="button">${T}</button>
        <div class="ls-container">
          <header class="ls-header">${y}<span>Select a Language</span></header>
          ${r}
        </div>
      </div>
    </div>
  </div>`,(l=f.querySelector(".ls-modal-overlay"))==null||l.addEventListener("click",t.onClose),(a=f.querySelector(".ls-modal-close"))==null||a.addEventListener("click",t.onClose);const s=f.querySelector(".ls-search input");s&&s.addEventListener("input",i=>{t&&(t.searchTerm=i.target.value,C())}),f.querySelectorAll(".ls-option").forEach(i=>{i.addEventListener("click",()=>{const c=i.getAttribute("data-code");c&&t&&(t.selectedCode=c,t.onSelect(c),t.onClose())})})}function E(e){e.key==="Escape"&&t&&t.onClose()}function R(e){f&&$(),f=document.createElement("div"),document.body.appendChild(f),t={languages:e.languages,flags:e.flags,showEnglishName:e.showEnglishName,showFlags:e.flagMode!=="none",isLoading:e.isLoading,error:e.error,searchTerm:"",selectedCode:null,onSelect:e.onSelect,onClose:e.onClose},document.addEventListener("keydown",E),C()}function Z(e){t&&(e.languages!==void 0&&(t.languages=e.languages),e.flags!==void 0&&(t.flags=e.flags),e.isLoading!==void 0&&(t.isLoading=e.isLoading),e.error!==void 0&&(t.error=e.error),C())}function $(){document.removeEventListener("keydown",E),f&&(f.remove(),f=null),t=null}let g=null,n=null,u=null,b=null;function q(e){return"data:image/svg+xml,"+encodeURIComponent(e)}function V(e,o){if(!o)return e;const r=o.toLowerCase();return e.filter(s=>s.name.toLowerCase().includes(r)||s.endonym.toLowerCase().includes(r)||s.code.toLowerCase().includes(r)||s.regionNameEnglish&&s.regionNameEnglish.toLowerCase().includes(r)||s.regionNameNative&&s.regionNameNative.toLowerCase().includes(r)||s.scriptNameEnglish&&s.scriptNameEnglish.toLowerCase().includes(r)||s.scriptNameLocal&&s.scriptNameLocal.toLowerCase().includes(r))}function K(e,o,r,s,l){let a="";if(r&&e.flagCodes.length>0&&o){const d=o[e.flagCodes[0]]||o[e.flagCodes[0].toLowerCase()];d&&(a=`<img class="ls-flag-sm" src="${q(d)}" alt="">`)}const i=s&&e.endonym&&e.endonym.toLowerCase()!==e.name.toLowerCase()?`<span class="ls-dropdown-english">${e.name}</span>`:"";let c="";if(e.scriptNameLocal||e.scriptNameEnglish){let d=e.scriptNameLocal||"";e.scriptNameLocal&&e.scriptNameEnglish&&e.scriptNameLocal.toLowerCase()!==e.scriptNameEnglish.toLowerCase()&&(d+=" | "),e.scriptNameEnglish&&(!e.scriptNameLocal||e.scriptNameLocal.toLowerCase()!==e.scriptNameEnglish.toLowerCase())&&(d+=e.scriptNameEnglish),c+=`<span class="ls-dropdown-variant">${d}</span>`}if(e.regionNameNative||e.regionNameEnglish){let d=e.regionNameNative||"";e.regionNameNative&&e.regionNameEnglish&&e.regionNameNative.toLowerCase()!==e.regionNameEnglish.toLowerCase()&&(d+=" | "),e.regionNameEnglish&&(!e.regionNameNative||e.regionNameNative.toLowerCase()!==e.regionNameEnglish.toLowerCase())&&(d+=e.regionNameEnglish),c+=`<span class="ls-dropdown-variant">${d}</span>`}return`<button class="ls-dropdown-option${l?" selected":""}" type="button" data-code="${e.code}">
    ${a}
    <div class="ls-dropdown-option-text">
      <span class="ls-dropdown-native">${e.endonym||e.name}</span>
      ${i}
    </div>
    ${c?`<div class="ls-dropdown-variant-container">${c}</div>`:""}
  </button>`}function L(){if(!g||!n)return;const e=V(n.languages,n.searchTerm),o=n.selectedCode?n.languages.find(l=>l.code===n.selectedCode):null;let r;if(n.error)r=`<div class="ls-dropdown-error"><p>Failed to load</p><p class="ls-error-details">${n.error.message}</p></div>`;else{const l=n.isLoading?'<div class="ls-dropdown-loading-overlay"><div class="ls-spinner-sm"></div></div>':"";let a;n.languages.length>0?e.length===0?a='<div class="ls-dropdown-empty">No languages found</div>':a=e.map(i=>K(i,n.flags,n.showFlags,n.showEnglishName&&!!i.endonym&&i.endonym!==i.name,(o==null?void 0:o.code)===i.code)).join(""):a=Array(5).fill('<div class="ls-dropdown-option-placeholder" style="padding:0.625rem 0.75rem;min-height:2.5rem;"></div>').join(""),r=`<div class="ls-dropdown-content">
      ${l}
      <div class="ls-search-compact">
        ${I}
        <input type="text" placeholder="Search languages..." value="${n.searchTerm}" autofocus>
      </div>
      <div class="ls-dropdown-list">${a}</div>
    </div>`}g.innerHTML=r;const s=g.querySelector(".ls-search-compact input");s&&(s.focus(),s.addEventListener("input",l=>{n&&(n.searchTerm=l.target.value,L())}),s.addEventListener("keydown",k)),g.querySelectorAll(".ls-dropdown-option").forEach(l=>{l.addEventListener("click",()=>{const a=l.getAttribute("data-code");a&&n&&(n.selectedCode=a,n.onSelect(a),n.onClose())})})}function k(e){e.key==="Escape"&&n&&n.onClose()}function W(){if(!g||!u)return;const e=g.getBoundingClientRect(),o=u.getBoundingClientRect(),r=window.innerHeight,s=window.innerWidth;r-o.bottom<e.height&&o.top>e.height&&g.classList.add("ls-dropdown-upward"),o.left+e.width>s&&g.classList.add("ls-dropdown-right")}function _(e,o){var r;g&&S(),u=e,g=document.createElement("div"),g.className="ls-dropdown",(r=e.parentElement)==null||r.appendChild(g),n={languages:o.languages,flags:o.flags,showEnglishName:o.showEnglishName,showFlags:o.flagMode!=="none",isLoading:o.isLoading,error:o.error,searchTerm:"",selectedCode:null,onSelect:o.onSelect,onClose:o.onClose},L(),W(),document.addEventListener("keydown",k),setTimeout(()=>{const s=l=>{g&&!g.contains(l.target)&&!(u!=null&&u.contains(l.target))&&o.onClose()};window.addEventListener("click",s),b=()=>window.removeEventListener("click",s)},0)}function X(e){n&&(e.languages!==void 0&&(n.languages=e.languages),e.flags!==void 0&&(n.flags=e.flags),e.isLoading!==void 0&&(n.isLoading=e.isLoading),e.error!==void 0&&(n.error=e.error),L())}function S(){document.removeEventListener("keydown",k),b==null||b(),b=null,g&&(g.remove(),g=null),u=null,n=null}const G="https://lsapi.casholab.com";function J(e){return{languages:(e.getAttribute("languages")||"").split(",").map(r=>r.trim()).filter(Boolean),isModal:e.getAttribute("is-modal")!=="false",showEnglishName:e.getAttribute("show-english-name")!=="false",flagMode:e.getAttribute("flag-mode")||"none",buttonSize:e.getAttribute("button-size")==="sm"?"sm":"lg",apiUrl:e.getAttribute("api-url")||G,flagLoadMode:e.getAttribute("flag-load-mode")==="single"?"single":"multi",callback:e.getAttribute("callback")||void 0}}function Q(e){const o=e.split("-"),r={lang:o[0]};for(let s=1;s<o.length;s++){const l=o[s];l.length===4&&/^[A-Za-z]{4}$/.test(l)?r.script=l:l.length===2&&/^[A-Za-z]{2}$/.test(l)&&(r.region=l)}return r}function Y(e,o,r){var s;return r==="none"||!o?[]:e.region?[e.region.toLowerCase()]:e.script&&((s=o.scriptFlags)!=null&&s[e.script])?o.scriptFlags[e.script]:o.flags??[]}function M(e,o){return e.resolved.map(r=>{var w,x;const s=Q(r),l=e.data[s.lang];let a,i,c,d,m=(l==null?void 0:l.data.endonym)??"";if(s.region&&((w=l==null?void 0:l.regionData)!=null&&w[s.region])){const p=l.regionData[s.region];a=p.regionNameEnglish,i=p.regionNameNative}if(s.script&&((x=l==null?void 0:l.scriptData)!=null&&x[s.script])){const p=l.scriptData[s.script];c=p.scriptNameEnglish,d=p.scriptNameLocal,m=p.languageInScript||m}return{code:r,name:(l==null?void 0:l.data.name)??r,endonym:m,regionNameEnglish:a,regionNameNative:i,scriptNameEnglish:c,scriptNameLocal:d,flagCodes:Y(s,l,o)}})}function ee(e){const o=new Set;for(const r of Object.values(e.data))if(r.flags&&r.flags.forEach(s=>o.add(s.toLowerCase())),r.scriptFlags)for(const s of Object.values(r.scriptFlags))s.forEach(l=>o.add(l.toLowerCase()));return Array.from(o)}async function se(e,o){const r=await fetch(`${o}/flags/${e.toLowerCase()}`);return r.ok?r.text():(r.status===404,null)}async function oe(e){const o=await fetch(`${e}/all-flags`);if(!o.ok)throw new Error(`Failed to fetch flags: HTTP ${o.status}`);return o.json()}async function re(e,o){const r={},s=await Promise.all(e.map(async l=>{const a=await se(l,o);return{code:l.toLowerCase(),svg:a}}));for(const{code:l,svg:a}of s)a&&(r[l]=a);return r}async function le(e){const o=new URLSearchParams({l:e.languages.join(","),f:e.flagMode}),r=await fetch(`${e.apiUrl}/languages?${o}`);if(!r.ok){const i=await r.json().catch(()=>({error:"Request failed"}));throw new Error(i.error||`HTTP ${r.status}`)}const s=await r.json();if(!s.resolved||s.resolved.length===0)throw new Error("Invalid response: no valid languages returned");if(s.flags&&Object.keys(s.flags).length>0)return s;const l=ee(s);if(l.length===0)return s;const a=e.flagLoadMode==="single"?await oe(e.apiUrl):await re(l,e.apiUrl);return{...s,flags:a}}function ae(e){const o=J(e);if(o.languages.length===0){console.error("[CasholabLS] No languages provided");return}let r=!1,s=null,l=!1,a=null;const i=document.createElement("div");i.className="ls-embed-wrapper",e.appendChild(i);async function c(){if(l||s)return;l=!0;const v=o.isModal?Z:X;v({isLoading:!0});try{s=await le(o),a=null;const h=M(s,o.flagMode);v({languages:h,flags:s.flags,isLoading:!1})}catch(h){a=h instanceof Error?h:new Error(String(h)),v({isLoading:!1,error:a})}finally{l=!1}}function d(v){o.callback&&typeof window[o.callback]=="function"&&window[o.callback](v)}function m(){r=!1,o.isModal?$():S()}function w(){if(r){m();return}r=!0;const h={languages:s?M(s,o.flagMode):[],flags:s==null?void 0:s.flags,showEnglishName:o.showEnglishName,flagMode:o.flagMode,isLoading:l||!s&&!a,error:a,onSelect:d,onClose:m};o.isModal?R(h):_(p,h),!s&&!l&&c()}function x(){!s&&!l&&!a&&c()}const p=H(o.buttonSize,x,w);i.appendChild(p)}function z(){F(),document.querySelectorAll("#casholab-ls, [casholab-ls]").forEach(o=>{o instanceof HTMLElement&&ae(o)})}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",z):z()})();
