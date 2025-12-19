(function(){"use strict";const P=`
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

.ls-pixel {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 0;
  pointer-events: none;
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

.ls-btn-flag {
  width: 20px;
  height: 14px;
  object-fit: contain;
  border-radius: 2px;
  filter: drop-shadow(0 0 1px var(--ls-border));
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
  gap: 0.5rem;
  scrollbar-color: var(--ls-border) transparent;
}

.ls-option {
  display: flex;
  align-items: center;
  justify-content: start;
  gap: 0.75rem;
  padding: var(--ls-padding);
  background: var(--ls-bg);
  border: 1px solid var(--ls-border);
  border-radius: var(--ls-radius);
  cursor: pointer;
  text-align: left;
  max-width: 260px;
  overflow: hidden;
  width: 100%;
  font-family: inherit;
}

@media (max-width: 1000px) {
  .ls-option {
    max-width: unset;
  }
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

.ls-option-meta-container {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.ls-option-meta {
  display: flex;
  gap: 0.5em;
  justify-content: flex-start;
  min-width: 50px;
}

.ls-meta-native {
  font-size: 0.75rem;
  font-weight: 500;
  color: color-mix(in srgb, var(--ls-fg) 60%, gray 40%);
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
`;function R(){if(document.getElementById("casholab-ls-styles"))return;const e=document.createElement("style");e.id="casholab-ls-styles",e.textContent=P,document.head.appendChild(e)}const M='<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 400 364" fill="none"><path d="M269.958 133.006C277.449 129.385 286.184 129.385 293.675 133.006L293.675 133.006C300.193 136.157 303.727 141.647 305.482 144.6C306.931 147.038 308.409 150.006 309.877 153.053L311.339 156.108L311.34 156.109L363.435 265.144L363.436 265.145L398.217 337.944C402.549 347.011 398.717 357.878 389.658 362.215C380.6 366.551 369.745 362.716 365.412 353.648L335.575 291.197H228.058L198.221 353.648C193.888 362.716 183.033 366.551 173.974 362.215C164.915 357.878 161.084 347.011 165.416 337.944L252.293 156.109L252.293 156.108C254.236 152.044 256.219 147.85 258.15 144.6C259.905 141.647 263.44 136.156 269.958 133.006ZM109.093 18.1996C109.093 8.14815 117.233 0 127.274 0C137.315 0 145.455 8.14815 145.455 18.1996V36.3992H236.363C246.404 36.3992 254.544 44.5479 254.544 54.5994C254.544 64.6508 246.404 72.799 236.363 72.799H205.968C196.654 116.969 179.546 157.739 155.723 193.585C160.911 196.781 166.067 199.538 171.088 201.796C180.247 205.915 184.337 216.687 180.221 225.856C176.106 235.025 165.345 239.118 156.186 234.999C148.681 231.624 141.196 227.516 133.88 222.837C104.662 257.777 68.3185 286.581 26.2765 307.495C17.2844 311.968 6.37227 308.297 1.90357 299.296C-2.56499 290.295 1.1022 279.372 10.0943 274.898C47.1711 256.454 79.1804 231.207 104.999 200.661C84.2915 181.895 66.1749 158.631 55.9818 134.482C52.0737 125.223 56.4038 114.546 65.6533 110.634C74.9029 106.722 85.5694 111.056 89.4776 120.315C96.8424 137.763 110.426 155.897 126.838 171.313C146.005 141.934 160.241 108.778 168.712 72.799H18.1854C8.1441 72.799 0.00420549 64.6508 0.00410879 54.5994C0.00410879 44.5479 8.14404 36.3992 18.1854 36.3992H109.093V18.1996ZM245.449 254.797H318.183L281.816 178.68L245.449 254.797Z" fill="currentColor"/></svg>',Z='<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>',q='<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>',V='<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 360 360" fill="none"><path d="M288 162C288 92.4121 231.588 35.9998 162 35.9997C92.4121 35.9997 35.9997 92.4121 35.9997 162C35.9998 231.588 92.4121 288 162 288C231.588 288 288 231.588 288 162ZM324 162C324 200.128 310.827 235.18 288.786 262.852L354.774 329.318C361.778 336.372 361.737 347.77 354.682 354.774C347.627 361.778 336.23 361.737 329.226 354.682L263.382 288.362C235.628 310.658 200.372 324 162 324C72.5299 324 9.79709e-05 251.471 0 162C0 72.5298 72.5298 0 162 0C251.471 9.79946e-05 324 72.5299 324 162Z" fill="currentColor"/></svg>',W='<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 360 360" fill="none"><path d="M288 162C288 92.4121 231.588 35.9998 162 35.9997C92.4121 35.9997 35.9997 92.4121 35.9997 162C35.9998 231.588 92.4121 288 162 288C231.588 288 288 231.588 288 162ZM324 162C324 200.128 310.827 235.18 288.786 262.852L354.774 329.318C361.778 336.372 361.737 347.77 354.682 354.774C347.627 361.778 336.23 361.737 329.226 354.682L263.382 288.362C235.628 310.658 200.372 324 162 324C72.5299 324 9.79709e-05 251.471 0 162C0 72.5298 72.5298 0 162 0C251.471 9.79946e-05 324 72.5299 324 162Z" fill="currentColor"/></svg>';function X(e){const s=document.createElement("button");return s.className=e.size==="sm"?"ls-btn sm":"ls-btn",s.type="button",T(s,e),s.addEventListener("mouseenter",e.onHover),s.addEventListener("click",e.onClick),s}function T(e,s){var m;const{size:t,text:o,displaySelected:r,showFlag:l,selectedLanguage:n}=s,a=r&&n?n.endonym||n.name:o,d=r&&l&&((m=n==null?void 0:n.flagSvgDataUris)!=null&&m.length)?n.flagSvgDataUris[0]:null,p=r&&n;if(t==="lg"){const b=p&&d?`<img class="ls-btn-flag" src="${d}" alt="" />`:M;e.innerHTML=`${b}<span>${a}</span>${Z}`}else{const b=p&&d?`<img class="ls-btn-flag" src="${d}" alt="" />`:"";e.innerHTML=`${M}${b}`}}let h=null,i=null;function K(e,s){if(!s)return e;const t=s.toLowerCase();return e.filter(o=>o.name.toLowerCase().includes(t)||o.endonym.toLowerCase().includes(t)||o.code.toLowerCase().includes(t)||o.regionNameEnglish&&o.regionNameEnglish.toLowerCase().includes(t)||o.regionNameNative&&o.regionNameNative.toLowerCase().includes(t)||o.scriptNameEnglish&&o.scriptNameEnglish.toLowerCase().includes(t)||o.scriptNameLocal&&o.scriptNameLocal.toLowerCase().includes(t))}function H(e,s){if(e.length===0)return"";const t=e.length>2?"grid":e.length===2?"row":"single",o=e.map(r=>`<img class="ls-flag" src="${r}" alt="">`).join("");return`<div class="ls-flags ls-flags-${t} ls-flags-${s}">${o}</div>`}function _(e,s,t){const o=e.scriptNameLocal?`<span class="ls-selected-script-local">(${e.scriptNameLocal})</span>`:"",r=e.regionNameNative?`<span class="ls-selected-region-local">(${e.regionNameNative})</span>`:"";let l="";if(t){let a="";e.scriptNameEnglish&&(!e.scriptNameLocal||e.scriptNameLocal.toLowerCase()!==e.scriptNameEnglish.toLowerCase())&&(a+=`(${e.scriptNameEnglish}) `),e.regionNameEnglish&&(!e.regionNameNative||e.regionNameNative.toLowerCase()!==e.regionNameEnglish.toLowerCase())&&(a+=e.regionNameEnglish),l=`<div class="ls-selected-english"><span class="ls-selected-name">${e.name}</span>${a?`<span class="ls-selected-variant">${a}</span>`:""}</div>`}const n=s&&e.flagSvgDataUris.length>0?H(e.flagSvgDataUris,"lg"):"";return`<div class="ls-selected">
    <div class="ls-selected-native">${e.endonym||e.name}${o}${r}</div>
    ${l}
    ${n}
  </div>`}function Y(e,s,t,o){const r=s&&e.flagSvgDataUris.length>0?H(e.flagSvgDataUris,"md"):"",l=e.regionNameNative||e.regionNameEnglish||e.scriptNameLocal||e.scriptNameEnglish;let n="";if(l){let d="";if(e.regionNameNative||e.regionNameEnglish){const p=t&&e.regionNameEnglish&&(!e.regionNameNative||e.regionNameNative.toLowerCase()!==e.regionNameEnglish.toLowerCase());d+=`<div class="ls-option-meta">
        <div class="ls-meta-native">${e.regionNameNative||""}</div>
        ${p?`<div class="ls-meta-english">${e.regionNameEnglish}</div>`:""}
      </div>`}if(e.scriptNameLocal||e.scriptNameEnglish){const p=t&&e.scriptNameEnglish&&(!e.scriptNameLocal||e.scriptNameLocal.toLowerCase()!==e.scriptNameEnglish.toLowerCase());d+=`<div class="ls-option-meta">
        <div class="ls-meta-native">${e.scriptNameLocal||""}</div>
        ${p?`<div class="ls-meta-english">${e.scriptNameEnglish}</div>`:""}
      </div>`}n=`<div class="ls-option-meta-container">${d}</div>`}const a=t&&e.endonym&&e.endonym!==e.name?`<div class="ls-option-english"><span class="ls-option-name">${e.name}</span></div>`:"";return`<button class="ls-option${o?" selected":""}" type="button" data-code="${e.code}">
    ${r}
    <div class="ls-option-content">
      <div class="ls-option-native">${e.endonym||e.name}</div>
      ${a}
    </div>
    ${n}
  </button>`}function z(){var l,n;if(!h||!i)return;const e=i,s=K(e.languages,e.searchTerm),t=e.selectedCode?e.languages.find(a=>a.code===e.selectedCode):null;let o;if(i.error)o=`<div class="ls-error"><p>Failed to load languages</p><p class="ls-error-details">${i.error.message}</p></div>`;else{const a=i.isLoading?'<div class="ls-loading-overlay"><div class="ls-spinner"></div></div>':"",d=t?_(t,i.showFlags,i.showEnglishName&&!!t.endonym&&t.endonym!==t.name)+'<div class="ls-hr"></div>':"",p=i.languages.length>0?s.map(m=>Y(m,i.showFlags,i.showEnglishName&&!!m.endonym&&m.endonym!==m.name,(t==null?void 0:t.code)===m.code)).join(""):Array(10).fill('<div class="ls-option-placeholder" style="padding:var(--ls-padding);background:var(--ls-bg);border:1px solid var(--ls-border);border-radius:var(--ls-radius);width:100%;max-width:360px;height:58px;"></div>').join("");o=`<div class="ls-content">
      ${a}
      ${d}
      <label class="ls-search">
        ${V}
        <input type="text" placeholder="Search languages..." value="${i.searchTerm}">
      </label>
      <div class="ls-list">${p}</div>
    </div>`}h.innerHTML=`<div class="ls-modal-outer">
    <div class="ls-modal-overlay"></div>
    <div class="ls-modal-container">
      <div class="ls-modal-body">
        <button class="ls-modal-close" type="button">${q}</button>
        <div class="ls-container">
          <header class="ls-header">${M}<span>Select a Language</span></header>
          ${o}
        </div>
      </div>
    </div>
  </div>`,(l=h.querySelector(".ls-modal-overlay"))==null||l.addEventListener("click",i.onClose),(n=h.querySelector(".ls-modal-close"))==null||n.addEventListener("click",i.onClose);const r=h.querySelector(".ls-search input");r&&r.addEventListener("input",a=>{i&&(i.searchTerm=a.target.value,z())}),h.querySelectorAll(".ls-option").forEach(a=>{a.addEventListener("click",()=>{const d=a.getAttribute("data-code");d&&i&&(i.selectedCode=d,i.onSelect(d),i.onClose())})})}function I(e){e.key==="Escape"&&i&&i.onClose()}function G(e){h&&B(),h=document.createElement("div"),document.body.appendChild(h),i={languages:e.languages,showEnglishName:e.showEnglishName,showFlags:e.flagMode!=="none",isLoading:e.isLoading,error:e.error,searchTerm:"",selectedCode:null,onSelect:e.onSelect,onClose:e.onClose},document.addEventListener("keydown",I),z()}function J(e){i&&(e.languages!==void 0&&(i.languages=e.languages),e.isLoading!==void 0&&(i.isLoading=e.isLoading),e.error!==void 0&&(i.error=e.error),z())}function B(){document.removeEventListener("keydown",I),h&&(h.remove(),h=null),i=null}let g=null,v=null,c=null,y=null,L=null;function Q(e,s){if(!s)return e;const t=s.toLowerCase();return e.filter(o=>o.name.toLowerCase().includes(t)||o.endonym.toLowerCase().includes(t)||o.code.toLowerCase().includes(t)||o.regionNameEnglish&&o.regionNameEnglish.toLowerCase().includes(t)||o.regionNameNative&&o.regionNameNative.toLowerCase().includes(t)||o.scriptNameEnglish&&o.scriptNameEnglish.toLowerCase().includes(t)||o.scriptNameLocal&&o.scriptNameLocal.toLowerCase().includes(t))}function ee(e,s,t,o){let r="";s&&e.flagSvgDataUris.length>0&&(r=`<img class="ls-flag-sm" src="${e.flagSvgDataUris[0]}" alt="">`);const l=t&&e.endonym&&e.endonym.toLowerCase()!==e.name.toLowerCase()?`<span class="ls-dropdown-english">${e.name}</span>`:"";let n="";if(e.scriptNameLocal||e.scriptNameEnglish){let a=e.scriptNameLocal||"";e.scriptNameLocal&&e.scriptNameEnglish&&e.scriptNameLocal.toLowerCase()!==e.scriptNameEnglish.toLowerCase()&&(a+=" | "),e.scriptNameEnglish&&(!e.scriptNameLocal||e.scriptNameLocal.toLowerCase()!==e.scriptNameEnglish.toLowerCase())&&(a+=e.scriptNameEnglish),n+=`<span class="ls-dropdown-variant">${a}</span>`}if(e.regionNameNative||e.regionNameEnglish){let a=e.regionNameNative||"";e.regionNameNative&&e.regionNameEnglish&&e.regionNameNative.toLowerCase()!==e.regionNameEnglish.toLowerCase()&&(a+=" | "),e.regionNameEnglish&&(!e.regionNameNative||e.regionNameNative.toLowerCase()!==e.regionNameEnglish.toLowerCase())&&(a+=e.regionNameEnglish),n+=`<span class="ls-dropdown-variant">${a}</span>`}return`<button class="ls-dropdown-option${o?" selected":""}" type="button" data-code="${e.code}">
    ${r}
    <div class="ls-dropdown-option-text">
      <span class="ls-dropdown-native">${e.endonym||e.name}</span>
      ${l}
    </div>
    ${n?`<div class="ls-dropdown-variant-container">${n}</div>`:""}
  </button>`}function j(){if(!g||!c)return;const e=c,s=Q(e.languages,e.searchTerm),t=e.selectedCode?e.languages.find(l=>l.code===e.selectedCode):null;let o;if(c.error)o=`<div class="ls-dropdown-error"><p>Failed to load</p><p class="ls-error-details">${c.error.message}</p></div>`;else{const l=c.isLoading?'<div class="ls-dropdown-loading-overlay"><div class="ls-spinner-sm"></div></div>':"";let n;c.languages.length>0?s.length===0?n='<div class="ls-dropdown-empty">No languages found</div>':n=s.map(a=>ee(a,c.showFlags,c.showEnglishName&&!!a.endonym&&a.endonym!==a.name,(t==null?void 0:t.code)===a.code)).join(""):n=Array(5).fill('<div class="ls-dropdown-option-placeholder" style="padding:0.625rem 0.75rem;min-height:2.5rem;"></div>').join(""),o=`<div class="ls-dropdown-content">
      ${l}
      <div class="ls-search-compact">
        ${W}
        <input type="text" placeholder="Search languages..." value="${c.searchTerm}" autofocus>
      </div>
      <div class="ls-dropdown-list">${n}</div>
    </div>`}g.innerHTML=o;const r=g.querySelector(".ls-search-compact input");r&&(r.focus(),r.addEventListener("input",l=>{c&&(c.searchTerm=l.target.value,j())}),r.addEventListener("keydown",A)),g.querySelectorAll(".ls-dropdown-option").forEach(l=>{l.addEventListener("click",()=>{const n=l.getAttribute("data-code");n&&c&&(c.selectedCode=n,c.onSelect(n),c.onClose())})})}function A(e){e.key==="Escape"&&c&&c.onClose()}function oe(){if(!g||!v)return;const e=v.getBoundingClientRect(),s=g.getBoundingClientRect(),t=document.documentElement.clientHeight,o=document.documentElement.clientWidth,r=s.height,l=s.width,n=e.top,a=e.left;t-n<r&&n>r&&g.classList.add("ls-dropdown-upward");const p=o-a,m=a;p<l&&m<l?(g.classList.remove("ls-dropdown-right"),g.style.transform=`translateX(${-a}px)`):p<l?(g.classList.add("ls-dropdown-right"),g.style.transform=""):(g.classList.remove("ls-dropdown-right"),g.style.transform="")}function se(e,s){var t,o;g&&U(),y=e,v=document.createElement("span"),v.className="ls-pixel",(t=e.parentElement)==null||t.appendChild(v),g=document.createElement("div"),g.className="ls-dropdown",(o=e.parentElement)==null||o.appendChild(g),c={languages:s.languages,showEnglishName:s.showEnglishName,showFlags:s.flagMode!=="none",isLoading:s.isLoading,error:s.error,searchTerm:"",selectedCode:null,onSelect:s.onSelect,onClose:s.onClose},j(),oe(),document.addEventListener("keydown",A),setTimeout(()=>{const r=l=>{g&&!g.contains(l.target)&&!(y!=null&&y.contains(l.target))&&s.onClose()};window.addEventListener("click",r),L=()=>window.removeEventListener("click",r)},0)}function te(e){c&&(e.languages!==void 0&&(c.languages=e.languages),e.isLoading!==void 0&&(c.isLoading=e.isLoading),e.error!==void 0&&(c.error=e.error),j())}function U(){document.removeEventListener("keydown",A),L==null||L(),L=null,v&&(v.remove(),v=null),g&&(g.remove(),g=null),y=null,c=null}const re="https://lsapi.casholab.com";function le(e){return{languages:(e.getAttribute("languages")||"").split(",").map(t=>t.trim()).filter(Boolean),isModal:e.getAttribute("is-modal")!=="false",showEnglishName:e.getAttribute("show-english-name")!=="false",flagMode:e.getAttribute("flag-mode")||"single",buttonSize:e.getAttribute("button-size")==="sm"?"sm":"lg",apiUrl:e.getAttribute("api-url")||re,flagLoadMode:e.getAttribute("flag-load-mode")==="single"?"single":"multi",callback:e.getAttribute("callback")||void 0,placeholderText:e.getAttribute("placeholder-text")||"Language",displaySelected:e.getAttribute("display-selected")==="true",autoSelect:e.getAttribute("auto-select")==="true"}}function ae(){var e;return typeof navigator>"u"?[]:((e=navigator.languages)==null?void 0:e.slice())??(navigator.language?[navigator.language]:[])}function ne(e,s){const t=s.map(r=>r.code.toLowerCase()),o=new Map(s.map(r=>[r.code.toLowerCase(),r]));for(const r of e){const l=r.toLowerCase();if(o.has(l))return o.get(l);const a=D(r).lang.toLowerCase();if(o.has(a))return o.get(a);for(const d of t)if(D(d).lang.toLowerCase()===a)return o.get(d)}return null}function D(e){const s=e.split("-"),t={lang:s[0]};for(let o=1;o<s.length;o++){const r=s[o];r.length===4&&/^[A-Za-z]{4}$/.test(r)?t.script=r:r.length===2&&/^[A-Za-z]{2}$/.test(r)&&(t.region=r)}return t}function ie(e,s,t){var o;return t==="none"||!s?[]:e.region?[e.region.toLowerCase()]:e.script&&((o=s.scriptFlags)!=null&&o[e.script])?s.scriptFlags[e.script]:s.flags??[]}function de(e){return"data:image/svg+xml,"+encodeURIComponent(e)}function F(e,s){return e.resolved.map(t=>{var C,E;const o=D(t),r=e.data[o.lang];let l,n,a,d,p=(r==null?void 0:r.data.endonym)??"";if(o.region&&((C=r==null?void 0:r.regionData)!=null&&C[o.region])){const f=r.regionData[o.region];l=f.regionNameEnglish,n=f.regionNameNative}if(o.script&&((E=r==null?void 0:r.scriptData)!=null&&E[o.script])){const f=r.scriptData[o.script];a=f.scriptNameEnglish,d=f.scriptNameLocal,p=f.languageInScript||p}const b=ie(o,r,s).map(f=>{var S,x;const $=((S=e.flags)==null?void 0:S[f])??((x=e.flags)==null?void 0:x[f.toLowerCase()]);return $?de($):null}).filter(f=>f!==null);return{code:t,name:(r==null?void 0:r.data.name)??t,endonym:p,regionNameEnglish:l,regionNameNative:n,scriptNameEnglish:a,scriptNameLocal:d,flagSvgDataUris:b}}).sort((t,o)=>t.endonym.localeCompare(o.endonym))}function ce(e){const s=new Set;for(const t of Object.values(e.data))if(t.flags&&t.flags.forEach(o=>s.add(o.toLowerCase())),t.scriptFlags)for(const o of Object.values(t.scriptFlags))o.forEach(r=>s.add(r.toLowerCase()));return Array.from(s)}async function ge(e,s){const t=await fetch(`${s}/flags/${e.toLowerCase()}`);return t.ok?t.text():(t.status===404,null)}async function pe(e){const s=await fetch(`${e}/all-flags`);if(!s.ok)throw new Error(`Failed to fetch flags: HTTP ${s.status}`);return s.json()}async function me(e,s){const t={},o=await Promise.all(e.map(async r=>{const l=await ge(r,s);return{code:r.toLowerCase(),svg:l}}));for(const{code:r,svg:l}of o)l&&(t[r]=l);return t}async function fe(e){const s=new URLSearchParams({l:e.languages.join(","),f:e.flagMode}),t=await fetch(`${e.apiUrl}/languages?${s}`);if(!t.ok){const n=await t.json().catch(()=>({error:"Request failed"}));throw new Error(n.error||`HTTP ${t.status}`)}const o=await t.json();if(!o.resolved||o.resolved.length===0)throw new Error("Invalid response: no valid languages returned");if(o.flags&&Object.keys(o.flags).length>0)return o;const r=ce(o);if(r.length===0)return o;const l=e.flagLoadMode==="single"?await pe(e.apiUrl):await me(r,e.apiUrl);return{...o,flags:l}}function he(e){const s=le(e);if(s.languages.length===0){console.error("[CasholabLS] No languages provided");return}let t=!1,o=null,r=!1,l=null,n=null,a=!1;const d=document.createElement("div");d.className="ls-embed-wrapper",e.appendChild(d);function p(){return{size:s.buttonSize,text:s.placeholderText,displaySelected:s.displaySelected,showFlag:s.flagMode!=="none",selectedLanguage:n,onHover:S,onClick:$}}function m(){T(x,p())}async function b(){if(r||o)return;r=!0;const w=s.isModal?J:te;w({isLoading:!0});try{o=await fe(s),l=null;const u=F(o,s.flagMode);if(w({languages:u,isLoading:!1}),s.autoSelect&&!a&&!n){const k=ae(),N=ne(k,u);N&&(a=!0,n=N,m(),C(N))}}catch(u){l=u instanceof Error?u:new Error(String(u)),w({isLoading:!1,error:l})}finally{r=!1}}function C(w){s.callback&&typeof window[s.callback]=="function"&&window[s.callback](w)}function E(w){const k=(o?F(o,s.flagMode):[]).find(N=>N.code===w);k&&(n=k,m(),C(k))}function f(){t=!1,s.isModal?B():U()}function $(){if(t){f();return}t=!0;const u={languages:o?F(o,s.flagMode):[],showEnglishName:s.showEnglishName,flagMode:s.flagMode,isLoading:r||!o&&!l,error:l,onSelect:E,onClose:f};s.isModal?G(u):se(x,u),!o&&!r&&b()}function S(){!o&&!r&&!l&&b()}const x=X(p());d.appendChild(x)}function O(){R(),document.querySelectorAll("#casholab-ls, [casholab-ls]").forEach(s=>{s instanceof HTMLElement&&he(s)})}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",O):O()})();
