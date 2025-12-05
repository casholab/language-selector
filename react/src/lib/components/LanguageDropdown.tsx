import React, { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import type { LanguageCode } from '../types';
import type { DisplayLanguage } from '../language-selector';
import { filterLanguages } from '../language-selector';
import { SearchInput } from './SearchInput';
import { DropdownOption } from './DropdownOption';
import styles from './LanguageDropdown.module.css';

interface LanguageDropdownProps {
  displayLanguages: DisplayLanguage[];
  flags?: Record<string, string>;
  isLoading?: boolean;
  error?: Error | null;
  skeletonCount?: number;
  selectedEntry?: DisplayLanguage | null;
  isOpen: boolean;
  showEnglishName?: boolean;
  showFlags?: boolean;
  selectLanguage: (code: LanguageCode) => void;
  close: () => void;
}

export const LanguageDropdown: React.FC<LanguageDropdownProps> = ({
  displayLanguages = [],
  flags,
  isLoading = false,
  error = null,
  skeletonCount = 0,
  selectedEntry = null,
  isOpen,
  showEnglishName = true,
  showFlags = false,
  selectLanguage,
  close,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [openUpward, setOpenUpward] = useState(false);
  const [alignRight, setAlignRight] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleClose = useCallback(() => {
    close();
    setSearchTerm('');
  }, [close]);

  const handleSelect = (code: LanguageCode) => {
    selectLanguage(code);
    handleClose();
  };

  const handleKeydown = useCallback(
    (e: React.KeyboardEvent | KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    },
    [handleClose]
  );

  useEffect(() => {
    if (!isOpen) return;

    const handleWindowKeydown = (e: KeyboardEvent) => handleKeydown(e);
    window.addEventListener('keydown', handleWindowKeydown);
    return () => window.removeEventListener('keydown', handleWindowKeydown);
  }, [isOpen, handleKeydown]);

  useEffect(() => {
    if (!isOpen || !dropdownRef.current) return;

    const rect = dropdownRef.current.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const viewportWidth = window.innerWidth;

    const spaceBelow = viewportHeight - rect.top;
    const dropdownHeight = rect.height;
    setOpenUpward(spaceBelow < dropdownHeight && rect.top > dropdownHeight);

    if (rect.right > viewportWidth) {
      setAlignRight(true);
    }

    const handleWindowClick = (e: MouseEvent) => {
      if (!dropdownRef.current?.contains(e.target as Node)) {
        handleClose();
      }
    };

    const timer = setTimeout(() => {
      window.addEventListener('click', handleWindowClick);
    }, 0);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('click', handleWindowClick);
    };
  }, [isOpen, handleClose]);

  const filteredLanguages = useMemo(
    () => filterLanguages(displayLanguages, searchTerm),
    [displayLanguages, searchTerm]
  );

  if (!isOpen) return null;

  return (
    <div
      ref={dropdownRef}
      className={`${styles.dropdown} ${openUpward ? styles.upward : ''} ${alignRight ? styles.right : ''}`}
    >
      {error ? (
        <div className={styles.error}>
          <p>Failed to load</p>
          <p className={styles.errorDetails}>{error.message}</p>
        </div>
      ) : (
        <div className={styles.content}>
          {isLoading && (
            <div className={styles.loadingOverlay}>
              <div className={styles.spinner} />
            </div>
          )}

          <SearchInput
            value={searchTerm}
            onChange={setSearchTerm}
            variant="compact"
            autoFocus
            onKeyDown={handleKeydown}
          />

          <div className={styles.list}>
            {displayLanguages.length > 0 ? (
              <>
                {filteredLanguages.length === 0 && (
                  <div className={styles.empty}>No languages found</div>
                )}
                {filteredLanguages.map((language) => (
                  <DropdownOption
                    key={language.code}
                    language={language}
                    flags={flags}
                    showFlags={showFlags}
                    showEnglishName={
                      showEnglishName &&
                      !!language.endonym &&
                      language.endonym !== language.name
                    }
                    selected={selectedEntry?.code === language.code}
                    onClick={() => handleSelect(language.code)}
                  />
                ))}
              </>
            ) : (
              Array.from({ length: skeletonCount }).map((_, i) => (
                <div key={i} className={styles.placeholder} />
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

