import React from 'react';
import type { DisplayLanguage } from '../language-selector';
import { FlagDisplay } from './FlagDisplay';
import styles from './LanguageOption.module.css';

interface LanguageOptionProps {
  language: DisplayLanguage;
  showFlags?: boolean;
  showEnglishName?: boolean;
  selected?: boolean;
  onClick?: () => void;
}

export const LanguageOption: React.FC<LanguageOptionProps> = ({
  language,
  showFlags = false,
  showEnglishName = true,
  selected = false,
  onClick,
}) => {
  const hasVariant =
    language.regionNameNative ||
    language.regionNameEnglish ||
    language.scriptNameLocal ||
    language.scriptNameEnglish;

  return (
    <button
      className={`${styles.option} ${selected ? styles.selected : ''}`}
      onClick={onClick}
    >
      {showFlags && language.flagSvgDataUris.length > 0 && (
        <FlagDisplay flagSvgDataUris={language.flagSvgDataUris} size="md" />
      )}
      <div className={styles.content}>
        <div className={styles.native}>{language.endonym || language.name}</div>
        {showEnglishName && (
          <div className={styles.english}>
            <span className={styles.name}>{language.name}</span>
          </div>
        )}
      </div>
      {hasVariant && (
        <>
          {(language.regionNameNative || language.regionNameEnglish) && (
            <div className={styles.meta}>
              <div className={styles.metaNative}>
                {language.regionNameNative || ''}
              </div>
              {showEnglishName &&
                language.regionNameEnglish &&
                (!language.regionNameNative ||
                  language.regionNameNative.toLowerCase() !==
                    language.regionNameEnglish.toLowerCase()) && (
                  <div className={styles.metaEnglish}>
                    {language.regionNameEnglish}
                  </div>
                )}
            </div>
          )}
          {(language.scriptNameLocal || language.scriptNameEnglish) && (
            <div className={styles.meta}>
              <div className={styles.metaNative}>
                {language.scriptNameLocal || ''}
              </div>
              {showEnglishName &&
                language.scriptNameEnglish &&
                (!language.scriptNameLocal ||
                  language.scriptNameLocal.toLowerCase() !==
                    language.scriptNameEnglish.toLowerCase()) && (
                  <div className={styles.metaEnglish}>
                    {language.scriptNameEnglish}
                  </div>
                )}
            </div>
          )}
        </>
      )}
    </button>
  );
};
