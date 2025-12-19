import React, { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import type {
  LanguageCode,
  LanguageLookupResult,
  DisplayOptions,
  LoadOptions,
} from '../types';
import type { DisplayLanguage } from '../language-selector';
import { buildDisplayLanguages, getBrowserLocales, findMatchingLanguage } from '../language-selector';
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
  selectedLanguage?: DisplayLanguage | null;
  onSelectedLanguageChange?: (language: DisplayLanguage | null) => void;
  onSelection?: (language: DisplayLanguage) => void;
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
  const showEnglishName = displayOptions.showEnglishName ?? false;
  const flagMode = displayOptions.flagMode ?? 'single';
  const isModal = displayOptions.isModal ?? true;
  const placeholderText = displayOptions.placeholderText ?? 'Language';
  const displaySelected = displayOptions.displaySelected ?? false;
  const autoSelect = loadOptions.autoSelect ?? false;

  const [internalSelectedLanguage, setInternalSelectedLanguage] = useState<DisplayLanguage | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [fetchedData, setFetchedData] = useState<LanguageLookupResult | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isFetching, setIsFetching] = useState(false);
  const hasAutoSelected = useRef(false);

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
    return displayLanguages.find((l) => l.code === selectedLanguage.code) ?? selectedLanguage;
  }, [selectedLanguage, displayLanguages]);

  useEffect(() => {
    if (autoSelect && !staticData && !fetchedData && !isFetching) {
      loadData();
    }
  }, [autoSelect]);

  useEffect(() => {
    if (autoSelect && !hasAutoSelected.current && displayLanguages.length > 0 && !selectedLanguage) {
      const browserLocales = getBrowserLocales();
      const match = findMatchingLanguage(browserLocales, displayLanguages);
      if (match) {
        hasAutoSelected.current = true;
        if (!isControlled) {
          setInternalSelectedLanguage(match);
        }
        onSelectedLanguageChange?.(match);
        onSelection?.(match);
      }
    }
  }, [autoSelect, displayLanguages, selectedLanguage, isControlled, onSelectedLanguageChange, onSelection]);

  const selectLanguage = useCallback(
    (code: LanguageCode) => {
      const entry = displayLanguages.find((l) => l.code === code);
      if (entry) {
        if (!isControlled) {
          setInternalSelectedLanguage(entry);
        }
        onSelectedLanguageChange?.(entry);
        onSelection?.(entry);
      }
    },
    [isControlled, displayLanguages, onSelectedLanguageChange, onSelection]
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
        text={placeholderText}
        displaySelected={displaySelected}
        selectedLanguage={selectedEntry}
        showFlag={flagMode !== 'none'}
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
