import React, { useState, useCallback, useMemo } from 'react';
import { LocalizeButton } from './LocalizeButton';
import type { DisplayOptions } from '../types';
import { loadDataFromFile } from '../language-file';
import { LanguageSelectorHandler } from './LanguageSelectorHandler';
import styles from './LanguageSelector.module.css';

interface LanguageSelectorStaticProps {
  staticFileData: string | object;
  selectedLanguage?: string | null;
  onSelectedLanguageChange?: (language: string | null) => void;
  onSelection?: (language: string) => void;
  displayOptions?: DisplayOptions;
}

export const LanguageSelectorStatic: React.FC<LanguageSelectorStaticProps> = ({
  staticFileData,
  selectedLanguage: controlledSelectedLanguage,
  onSelectedLanguageChange,
  onSelection,
  displayOptions: propsDisplayOptions,
}) => {
  const [internalSelectedLanguage, setInternalSelectedLanguage] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const { data: staticData, displayOptions: staticDisplayOptions } = useMemo(
    () => loadDataFromFile(staticFileData),
    [staticFileData]
  );

  const isControlled = controlledSelectedLanguage !== undefined;
  const selectedLanguage = isControlled ? controlledSelectedLanguage : internalSelectedLanguage;

  const handleSelectedLanguageChange = useCallback(
    (language: string | null) => {
      if (!isControlled) {
        setInternalSelectedLanguage(language);
      }
      onSelectedLanguageChange?.(language);
    },
    [isControlled, onSelectedLanguageChange]
  );

  const handleSelection = useCallback(
    (code: string) => {
      handleSelectedLanguageChange(code);
      onSelection?.(code);
    },
    [handleSelectedLanguageChange, onSelection]
  );

  const displayOptions = propsDisplayOptions ?? staticDisplayOptions ?? undefined;
  const buttonSize = displayOptions?.buttonSize;

  return (
    <div className={styles.wrapper}>
      <LocalizeButton onClick={() => setIsOpen(!isOpen)} size={buttonSize} />
      <LanguageSelectorHandler
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        selectedLanguage={selectedLanguage}
        onSelectedLanguageChange={handleSelectedLanguageChange}
        onSelection={handleSelection}
        staticData={staticData}
        displayOptions={displayOptions}
      />
    </div>
  );
};

