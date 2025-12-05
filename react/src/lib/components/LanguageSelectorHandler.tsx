import React, { useState, useEffect, useMemo, useCallback } from 'react';
import type {
  LanguageCode,
  LanguageLookupResult,
  DisplayOptions,
  LoadOptions,
} from '../types';
import type { DisplayLanguage } from '../language-selector';
import { buildDisplayLanguages } from '../language-selector';
import { loadLanguageData } from '../loader';
import '../language-selector.css';
import { LanguageModal } from './LanguageModal';
import { LanguageDropdown } from './LanguageDropdown';

interface LanguageSelectorHandlerProps {
  staticData?: LanguageLookupResult;
  languages?: string[];
  displayOptions?: DisplayOptions;
  loadOptions?: LoadOptions;
  selectedLanguage: LanguageCode | null;
  onSelectedLanguageChange: (language: LanguageCode | null) => void;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSelection?: (language: LanguageCode) => void;
  preload?: boolean;
}

export const LanguageSelectorHandler: React.FC<LanguageSelectorHandlerProps> = ({
  staticData,
  languages = [],
  displayOptions = {},
  loadOptions = {},
  selectedLanguage,
  onSelectedLanguageChange,
  isOpen,
  onOpenChange,
  onSelection,
  preload = false,
}) => {
  const showEnglishName = displayOptions.showEnglishName ?? true;
  const flagMode = displayOptions.flagMode ?? 'none';
  const isModal = displayOptions.isModal ?? true;

  const [fetchedData, setFetchedData] = useState<LanguageLookupResult | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isFetching, setIsFetching] = useState(false);

  const loadData = useCallback(async () => {
    if (isFetching || fetchedData || staticData) return;
    if (!languages || languages.length === 0) {
      setError(new Error('No languages provided'));
      return;
    }

    setIsFetching(true);
    try {
      const data = await loadLanguageData(languages, displayOptions, loadOptions);
      setFetchedData(data);
      setError(null);
    } catch (e) {
      setError(e instanceof Error ? e : new Error(String(e)));
    } finally {
      setIsFetching(false);
    }
  }, [isFetching, fetchedData, staticData, languages, displayOptions, loadOptions]);

  useEffect(() => {
    if ((isOpen || preload) && !staticData && !fetchedData && !isFetching) {
      loadData();
    }
  }, [isOpen, preload, staticData, fetchedData, isFetching, loadData]);

  const languagesData = staticData ?? fetchedData;
  const isLoading = isFetching || (!languagesData && !error);

  const displayLanguages = useMemo((): DisplayLanguage[] => {
    if (!languagesData) return [];
    return buildDisplayLanguages(languagesData, flagMode);
  }, [languagesData, flagMode]);

  const selectedEntry = useMemo((): DisplayLanguage | null => {
    if (!selectedLanguage) return null;
    return displayLanguages.find((l) => l.code === selectedLanguage) ?? null;
  }, [selectedLanguage, displayLanguages]);

  const selectLanguage = useCallback(
    (code: LanguageCode) => {
      onSelectedLanguageChange(code);
      onSelection?.(code);
    },
    [onSelectedLanguageChange, onSelection]
  );

  const close = useCallback(() => {
    onOpenChange(false);
  }, [onOpenChange]);

  if (isModal) {
    return (
      <LanguageModal
        displayLanguages={displayLanguages}
        flags={languagesData?.flags}
        isLoading={isLoading}
        error={error}
        skeletonCount={languages.length}
        selectedEntry={selectedEntry}
        isOpen={isOpen}
        showEnglishName={showEnglishName}
        showFlags={flagMode !== 'none'}
        selectLanguage={selectLanguage}
        close={close}
      />
    );
  }

  return (
    <LanguageDropdown
      displayLanguages={displayLanguages}
      flags={languagesData?.flags}
      isLoading={isLoading}
      error={error}
      skeletonCount={languages.length}
      selectedEntry={selectedEntry}
      isOpen={isOpen}
      showEnglishName={showEnglishName}
      showFlags={flagMode !== 'none'}
      selectLanguage={selectLanguage}
      close={close}
    />
  );
};

