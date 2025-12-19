import React from 'react';
import type { DisplayOptions, LoadOptions } from '../types';
import type { DisplayLanguage } from '../language-selector';
import { LanguageSelectorHandler } from './LanguageSelectorHandler';

interface LanguageSelectorProps {
  languages: string[];
  displayOptions?: DisplayOptions;
  loadOptions?: LoadOptions;
  selectedLanguage?: DisplayLanguage | null;
  onSelectedLanguageChange?: (language: DisplayLanguage | null) => void;
  onSelection?: (language: DisplayLanguage) => void;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  languages,
  displayOptions = {},
  loadOptions = {},
  selectedLanguage,
  onSelectedLanguageChange,
  onSelection,
}) => {
  if (!languages || languages.length === 0) {
    console.error('[LanguageSelector] No languages provided.');
    return null;
  }

  return (
    <LanguageSelectorHandler
      languages={languages}
      displayOptions={displayOptions}
      loadOptions={loadOptions}
      selectedLanguage={selectedLanguage}
      onSelectedLanguageChange={onSelectedLanguageChange}
      onSelection={onSelection}
    />
  );
};
