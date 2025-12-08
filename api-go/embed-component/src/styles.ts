export const CSS = `
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
  justify-content: start;
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
`;

export function injectStyles(): void {
  if (document.getElementById('casholab-ls-styles')) return;
  const style = document.createElement('style');
  style.id = 'casholab-ls-styles';
  style.textContent = CSS;
  document.head.appendChild(style);
}

