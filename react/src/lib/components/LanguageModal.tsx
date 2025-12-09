import React, { useState, useMemo } from 'react';
import { Modal } from './Modal';
import { LanguageIcon } from '../icons';
import type { LanguageCode } from '../types';
import type { DisplayLanguage } from '../language-selector';
import { filterLanguages } from '../language-selector';
import { SearchInput } from './SearchInput';
import { LanguageOption } from './LanguageOption';
import { SelectedLanguageDisplay } from './SelectedLanguageDisplay';
import styles from './LanguageModal.module.css';

interface LanguageModalProps {
  displayLanguages: DisplayLanguage[];
  isLoading?: boolean;
  skeletonCount?: number;
  selectedEntry?: DisplayLanguage | null;
  isOpen: boolean;
  showEnglishName?: boolean;
  showFlags?: boolean;
  selectLanguage: (code: LanguageCode) => void;
  close: () => void;
}

export const LanguageModal: React.FC<LanguageModalProps> = ({
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

  const handleClose = () => {
    close();
    setSearchTerm('');
  };

  const handleSelect = (code: LanguageCode) => {
    selectLanguage(code);
    handleClose();
  };

  const filteredLanguages = useMemo(
    () => filterLanguages(displayLanguages, searchTerm),
    [displayLanguages, searchTerm]
  );

  if (!isOpen) return null;

  return (
    <Modal close={handleClose} xbutton bgCloses>
      <div className={styles.container}>
        <header className={styles.header}>
          <LanguageIcon width="20" height="20" />
          <span>Select a Language</span>
        </header>

        <div className={styles.content}>
          {isLoading && (
            <div className={styles.loadingOverlay}>
              <div className={styles.spinner} />
            </div>
          )}

          {selectedEntry && (
            <>
              <SelectedLanguageDisplay
                language={selectedEntry}
                showFlags={showFlags}
                showEnglishName={
                  showEnglishName &&
                  !!selectedEntry.endonym &&
                  selectedEntry.endonym !== selectedEntry.name
                }
              />
              <hr className={styles.divider} />
            </>
          )}

          <SearchInput value={searchTerm} onChange={setSearchTerm} />

          <div className={styles.list}>
            {displayLanguages.length > 0
              ? filteredLanguages.map((language) => (
                  <LanguageOption
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
                ))
              : Array.from({ length: skeletonCount }).map((_, i) => (
                  <div key={i} className={styles.placeholder} />
                ))}
          </div>
        </div>
      </div>
    </Modal>
  );
};
