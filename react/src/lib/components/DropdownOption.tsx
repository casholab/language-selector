import React from 'react';
import type { DisplayLanguage } from '../language-selector';
import { svgToDataUri } from '../language-selector';
import styles from './DropdownOption.module.css';

interface DropdownOptionProps {
  language: DisplayLanguage;
  flags?: Record<string, string>;
  showFlags?: boolean;
  showEnglishName?: boolean;
  selected?: boolean;
  onClick?: () => void;
}

export const DropdownOption: React.FC<DropdownOptionProps> = ({
  language,
  flags,
  showFlags = false,
  showEnglishName = true,
  selected = false,
  onClick,
}) => {
  const flagSvg =
    showFlags && language.flagCodes.length > 0 && flags
      ? flags[language.flagCodes[0]]
      : null;

  return (
    <button
      className={`${styles.option} ${selected ? styles.selected : ''}`}
      onClick={onClick}
      type="button"
    >
      {flagSvg && (
        <img className={styles.flag} src={svgToDataUri(flagSvg)} alt="" />
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

