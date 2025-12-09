import React, { useState, useMemo, useEffect, useRef, useCallback, useId } from 'react';
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
  isLoading = false,
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
  const [leftShift, setLeftShift] = useState(0);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pixelRef = useRef<HTMLSpanElement>(null);
  const uuid = useId();

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
    if (!isOpen || !dropdownRef.current || !pixelRef.current) return;

    const pixelRect = pixelRef.current.getBoundingClientRect();
    const dropdownRect = dropdownRef.current.getBoundingClientRect();
    const viewportHeight = document.documentElement.clientHeight;
    const viewportWidth = document.documentElement.clientWidth;
    const dropdownHeight = dropdownRect.height;
    const dropdownWidth = dropdownRect.width;
    const topLeftY = pixelRect.top;
    const topLeftX = pixelRect.left;

    const spaceBelow = viewportHeight - topLeftY;
    setOpenUpward(spaceBelow < dropdownHeight && topLeftY > dropdownHeight);

    const spaceRight = viewportWidth - topLeftX;
    const spaceLeft = topLeftX;

    if (spaceRight < dropdownWidth && spaceLeft < dropdownWidth) {
      setAlignRight(false);
      setLeftShift(-topLeftX);
    } else if (spaceRight < dropdownWidth) {
      setAlignRight(true);
      setLeftShift(0);
    } else {
      setAlignRight(false);
      setLeftShift(0);
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

  return (
    <>
      <span ref={pixelRef} className={styles.pixel} />
      {isOpen && (
        <div
          key={uuid}
          ref={dropdownRef}
          className={`${styles.dropdown} ${openUpward ? styles.upward : ''} ${alignRight ? styles.right : ''}`}
          style={leftShift ? { transform: `translateX(${leftShift}px)` } : undefined}
        >
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
        </div>
      )}
    </>
  );
};
