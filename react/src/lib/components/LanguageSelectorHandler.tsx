import React, { useState, useMemo, useCallback } from 'react';
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
import { LocalizeButton } from './LocalizeButton';
import styles from './LanguageSelectorHandler.module.css';

interface LanguageSelectorHandlerProps {
  staticData?: LanguageLookupResult;
  languages?: string[];
  displayOptions?: DisplayOptions;
  loadOptions?: LoadOptions;
  selectedLanguage?: LanguageCode | null;
  onSelectedLanguageChange?: (language: LanguageCode | null) => void;
  onSelection?: (language: LanguageCode) => void;
}

export const LanguageSelectorHandler: React.FC<LanguageSelectorHandlerProps> = ({
  staticData,
  languages = [],
  displayOptions = {},
  loadOptions = {},
  selectedLanguage: controlledSelectedLanguage,
  onSelectedLanguageChange,
  onSelection,
}) => {
  const showEnglishName = displayOptions.showEnglishName ?? true;
  const flagMode = displayOptions.flagMode ?? 'none';
  const isModal = displayOptions.isModal ?? true;

  const [internalSelectedLanguage, setInternalSelectedLanguage] = useState<LanguageCode | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [fetchedData, setFetchedData] = useState<LanguageLookupResult | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isFetching, setIsFetching] = useState(false);

  const isControlled = controlledSelectedLanguage !== undefined;
  const selectedLanguage = isControlled ? controlledSelectedLanguage : internalSelectedLanguage;

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

  const handleMouseEnter = useCallback(() => {
    if (!staticData && !fetchedData && !isFetching) {
      loadData();
    }
  }, [staticData, fetchedData, isFetching, loadData]);

  const handleClick = useCallback(() => {
    setIsOpen((prev) => !prev);
    if (!staticData && !fetchedData && !isFetching) {
      loadData();
    }
  }, [staticData, fetchedData, isFetching, loadData]);

  const languagesData = staticData ?? fetchedData;

  const displayLanguages = useMemo((): DisplayLanguage[] => {
    if (!languagesData) return [];
    return buildDisplayLanguages(languagesData, flagMode, languagesData.flags);
  }, [languagesData, flagMode]);

  const selectedEntry = useMemo((): DisplayLanguage | null => {
    if (!selectedLanguage) return null;
    return displayLanguages.find((l) => l.code === selectedLanguage) ?? null;
  }, [selectedLanguage, displayLanguages]);

  const selectLanguage = useCallback(
    (code: LanguageCode) => {
      if (!isControlled) {
        setInternalSelectedLanguage(code);
      }
      onSelectedLanguageChange?.(code);
      onSelection?.(code);
    },
    [isControlled, onSelectedLanguageChange, onSelection]
  );

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <div className={styles.wrapper}>
      <LocalizeButton
        onMouseEnter={handleMouseEnter}
        onClick={handleClick}
        size={displayOptions.buttonSize}
      />
      {error && (
        <div className={styles.error}>
          <p>Failed to load languages</p>
          <p className={styles.errorDetails}>{error.message}</p>
          <button onClick={loadData}>Retry</button>
          <hr />
          <button onClick={() => setError(null)}>Close</button>
        </div>
      )}
      {isModal ? (
        <LanguageModal
          displayLanguages={displayLanguages}
          isLoading={isFetching}
          skeletonCount={languages.length}
          selectedEntry={selectedEntry}
          isOpen={isOpen}
          showEnglishName={showEnglishName}
          showFlags={flagMode !== 'none'}
          selectLanguage={selectLanguage}
          close={close}
        />
      ) : (
        <LanguageDropdown
          displayLanguages={displayLanguages}
          isLoading={isFetching}
          skeletonCount={languages.length}
          selectedEntry={selectedEntry}
          isOpen={isOpen}
          showEnglishName={showEnglishName}
          showFlags={flagMode !== 'none'}
          selectLanguage={selectLanguage}
          close={close}
        />
      )}
    </div>
  );
};
