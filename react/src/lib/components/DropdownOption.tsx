import React from 'react';
import type { DisplayLanguage } from '../language-selector';
import styles from './DropdownOption.module.css';

interface DropdownOptionProps {
  language: DisplayLanguage;
  showFlags?: boolean;
  showEnglishName?: boolean;
  selected?: boolean;
  onClick?: () => void;
}

export const DropdownOption: React.FC<DropdownOptionProps> = ({
  language,
  showFlags = false,
  showEnglishName = true,
  selected = false,
  onClick,
}) => {
  return (
    <button
      className={`${styles.option} ${selected ? styles.selected : ''}`}
      onClick={onClick}
      type="button"
    >
      {showFlags && language.flagSvgDataUris.length > 0 && (
        <img className={styles.flag} src={language.flagSvgDataUris[0]} alt="" />
      )}
      <div className={styles.text}>
        <span className={styles.native}>
          {language.endonym || language.name}
        </span>
        {showEnglishName &&
          language.endonym &&
          language.endonym.toLowerCase() !== language.name.toLowerCase() && (
            <span className={styles.english}>{language.name}</span>
          )}
      </div>
      <div className={styles.variantContainer}>
        {(language.scriptNameLocal || language.scriptNameEnglish) && (
          <span className={styles.variant}>
            {language.scriptNameLocal}
            {language.scriptNameLocal &&
              language.scriptNameEnglish &&
              language.scriptNameLocal.toLowerCase() !==
                language.scriptNameEnglish.toLowerCase() && ' | '}
            {language.scriptNameEnglish &&
              (!language.scriptNameLocal ||
                language.scriptNameLocal.toLowerCase() !==
                  language.scriptNameEnglish.toLowerCase()) &&
              language.scriptNameEnglish}
          </span>
        )}
        {(language.regionNameNative || language.regionNameEnglish) && (
          <span className={styles.variant}>
            {language.regionNameNative}
            {language.regionNameNative &&
              language.regionNameEnglish &&
              language.regionNameNative.toLowerCase() !==
                language.regionNameEnglish.toLowerCase() && ' | '}
            {language.regionNameEnglish &&
              (!language.regionNameNative ||
                language.regionNameNative.toLowerCase() !==
                  language.regionNameEnglish.toLowerCase()) &&
              language.regionNameEnglish}
          </span>
        )}
      </div>
    </button>
  );
};
