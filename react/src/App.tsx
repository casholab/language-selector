import { useState } from 'react';
import { LanguageSelector } from './lib';
import type { LanguageCode } from './lib';

const TEST_LANGUAGES = [
  'en',
  'es',
  'fr',
  'de',
  'it',
  'pt',
  'zh',
  'ja',
  'ko',
  'ar',
  'ru',
  'hi',
  'en-GB',
  'en-US',
  'es-MX',
  'pt-BR',
  'zh-Hans',
  'zh-Hant',
];

function App() {
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageCode | null>(null);
  const [selectedLanguage2, setSelectedLanguage2] = useState<LanguageCode | null>(null);
  const [selectedLanguage3, setSelectedLanguage3] = useState<LanguageCode | null>(null);
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('system');

  const getThemeClass = () => {
    if (theme === 'system') return '';
    return theme;
  };

  return (
    <div className={getThemeClass()} style={{ minHeight: '100vh', padding: '2rem', background: 'var(--ls-bg)' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ color: 'var(--ls-fg)', marginBottom: '2rem' }}>
          Language Selector React Test Page
        </h1>

        <div style={{ marginBottom: '2rem', display: 'flex', gap: '1rem' }}>
          <button
            onClick={() => setTheme('light')}
            style={{
              padding: '0.5rem 1rem',
              background: theme === 'light' ? 'var(--ls-border-selected)' : 'var(--ls-btn-bg)',
              border: '1px solid var(--ls-btn-border)',
              borderRadius: 'var(--ls-radius)',
              color: theme === 'light' ? 'white' : 'var(--ls-fg)',
              cursor: 'pointer',
            }}
          >
            Light
          </button>
          <button
            onClick={() => setTheme('dark')}
            style={{
              padding: '0.5rem 1rem',
              background: theme === 'dark' ? 'var(--ls-border-selected)' : 'var(--ls-btn-bg)',
              border: '1px solid var(--ls-btn-border)',
              borderRadius: 'var(--ls-radius)',
              color: theme === 'dark' ? 'white' : 'var(--ls-fg)',
              cursor: 'pointer',
            }}
          >
            Dark
          </button>
          <button
            onClick={() => setTheme('system')}
            style={{
              padding: '0.5rem 1rem',
              background: theme === 'system' ? 'var(--ls-border-selected)' : 'var(--ls-btn-bg)',
              border: '1px solid var(--ls-btn-border)',
              borderRadius: 'var(--ls-radius)',
              color: theme === 'system' ? 'white' : 'var(--ls-fg)',
              cursor: 'pointer',
            }}
          >
            System
          </button>
        </div>

        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ color: 'var(--ls-fg)', marginBottom: '1rem' }}>
            Modal Mode (Default)
          </h2>
          <p style={{ color: 'var(--ls-fg-muted)', marginBottom: '1rem' }}>
            Default modal display with flags.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <LanguageSelector
              languages={TEST_LANGUAGES}
              displayOptions={{ flagMode: 'all', showEnglishName: true }}
              selectedLanguage={selectedLanguage}
              onSelectedLanguageChange={setSelectedLanguage}
              onSelection={(lang) => console.log('Selected:', lang)}
            />
            {selectedLanguage && (
              <span style={{ color: 'var(--ls-fg-muted)' }}>
                Selected: <strong style={{ color: 'var(--ls-fg)' }}>{selectedLanguage}</strong>
              </span>
            )}
          </div>
        </section>

        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ color: 'var(--ls-fg)', marginBottom: '1rem' }}>
            Dropdown Mode
          </h2>
          <p style={{ color: 'var(--ls-fg-muted)', marginBottom: '1rem' }}>
            Dropdown display without flags.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <LanguageSelector
              languages={TEST_LANGUAGES}
              displayOptions={{ isModal: false, flagMode: 'none', showEnglishName: true }}
              selectedLanguage={selectedLanguage2}
              onSelectedLanguageChange={setSelectedLanguage2}
              onSelection={(lang) => console.log('Selected (dropdown):', lang)}
            />
            {selectedLanguage2 && (
              <span style={{ color: 'var(--ls-fg-muted)' }}>
                Selected: <strong style={{ color: 'var(--ls-fg)' }}>{selectedLanguage2}</strong>
              </span>
            )}
          </div>
        </section>

        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ color: 'var(--ls-fg)', marginBottom: '1rem' }}>
            Small Button with Flags
          </h2>
          <p style={{ color: 'var(--ls-fg-muted)', marginBottom: '1rem' }}>
            Compact button with flags displayed.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <LanguageSelector
              languages={TEST_LANGUAGES}
              displayOptions={{ buttonSize: 'sm', flagMode: 'single', isModal: false }}
              selectedLanguage={selectedLanguage3}
              onSelectedLanguageChange={setSelectedLanguage3}
              onSelection={(lang) => console.log('Selected (small):', lang)}
            />
            {selectedLanguage3 && (
              <span style={{ color: 'var(--ls-fg-muted)' }}>
                Selected: <strong style={{ color: 'var(--ls-fg)' }}>{selectedLanguage3}</strong>
              </span>
            )}
          </div>
        </section>

        <section>
          <h2 style={{ color: 'var(--ls-fg)', marginBottom: '1rem' }}>
            Uncontrolled Component
          </h2>
          <p style={{ color: 'var(--ls-fg-muted)', marginBottom: '1rem' }}>
            Uses internal state management.
          </p>
          <LanguageSelector
            languages={['en', 'es', 'fr', 'de', 'it']}
            displayOptions={{ flagMode: 'all' }}
            onSelection={(lang) => console.log('Uncontrolled selection:', lang)}
          />
        </section>
      </div>
    </div>
  );
}

export default App;

