import React, { useMemo } from 'react';
import type { DisplayOptions } from '../types';
import { loadDataFromFile } from '../language-file';
import { LanguageSelectorHandler } from './LanguageSelectorHandler';

interface LanguageSelectorStaticProps {
  staticFileData: string | object;
  selectedLanguage?: string | null;
  onSelectedLanguageChange?: (language: string | null) => void;
  onSelection?: (language: string) => void;
  displayOptions?: DisplayOptions;
}

export const LanguageSelectorStatic: React.FC<LanguageSelectorStaticProps> = ({
  staticFileData,
  selectedLanguage,
  onSelectedLanguageChange,
  onSelection,
  displayOptions: propsDisplayOptions,
}) => {
  const { data: staticData, displayOptions: staticDisplayOptions } = useMemo(
    () => loadDataFromFile(staticFileData),
    [staticFileData]
  );

  return (
    <LanguageSelectorHandler
      staticData={staticData}
      displayOptions={propsDisplayOptions ?? staticDisplayOptions ?? undefined}
      selectedLanguage={selectedLanguage}
      onSelectedLanguageChange={onSelectedLanguageChange}
      onSelection={onSelection}
    />
  );
};
