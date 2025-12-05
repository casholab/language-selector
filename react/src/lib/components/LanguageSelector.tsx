import React, { useState, useCallback } from 'react';
import type { LanguageCode, DisplayOptions, LoadOptions } from '../types';
import { LanguageSelectorHandler } from './LanguageSelectorHandler';
import { LocalizeButton } from './LocalizeButton';
import styles from './LanguageSelector.module.css';

interface LanguageSelectorProps {
  languages: string[];
  displayOptions?: DisplayOptions;
  loadOptions?: LoadOptions;
  selectedLanguage?: LanguageCode | null;
  onSelectedLanguageChange?: (language: LanguageCode | null) => void;
  onSelection?: (language: LanguageCode) => void;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  languages,
  displayOptions = {},
  loadOptions = {},
  selectedLanguage: controlledSelectedLanguage,
  onSelectedLanguageChange,
  onSelection,
}) => {
  const [internalSelectedLanguage, setInternalSelectedLanguage] = useState<LanguageCode | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [preload, setPreload] = useState(false);

  const isControlled = controlledSelectedLanguage !== undefined;
  const selectedLanguage = isControlled ? controlledSelectedLanguage : internalSelectedLanguage;

  const handleSelectedLanguageChange = useCallback(
    (language: LanguageCode | null) => {
      if (!isControlled) {
        setInternalSelectedLanguage(language);
      }
      onSelectedLanguageChange?.(language);
    },
    [isControlled, onSelectedLanguageChange]
  );

  if (!languages || languages.length === 0) {
    console.error('[LanguageSelector] No languages provided.');
    return null;
  }

  return (
    <div className={styles.wrapper}>
      <LocalizeButton
        onMouseEnter={() => setPreload(true)}
        onClick={() => setIsOpen(!isOpen)}
        size={displayOptions.buttonSize}
      />
      <LanguageSelectorHandler
        preload={preload}
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        selectedLanguage={selectedLanguage}
        onSelectedLanguageChange={handleSelectedLanguageChange}
        onSelection={onSelection}
        languages={languages}
        displayOptions={displayOptions}
        loadOptions={loadOptions}
      />
    </div>
  );
};

