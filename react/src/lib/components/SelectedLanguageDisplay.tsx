import React from 'react';
import type { DisplayLanguage } from '../language-selector';
import { FlagDisplay } from './FlagDisplay';
import styles from './SelectedLanguageDisplay.module.css';

interface SelectedLanguageDisplayProps {
  language: DisplayLanguage;
  flags?: Record<string, string>;
  showFlags?: boolean;
  showEnglishName?: boolean;
}

export const SelectedLanguageDisplay: React.FC<SelectedLanguageDisplayProps> = ({
  language,
  flags,
  showFlags = false,
  showEnglishName = true,
}) => {
  return (
    <div className={styles.selected}>
      <div className={styles.native}>
        {language.endonym || language.name}
        {language.scriptNameLocal && (
          <span className={styles.scriptLocal}>({language.scriptNameLocal})</span>
        )}
        {language.regionNameNative && (
          <span className={styles.regionLocal}>({language.regionNameNative})</span>
        )}
      </div>
      {showEnglishName && (
        <div className={styles.english}>
          <span className={styles.name}>{language.name}</span>
          {(language.regionNameEnglish || language.scriptNameEnglish) && (
            <span className={styles.variant}>
              {language.scriptNameEnglish &&
                (!language.scriptNameLocal ||
                  language.scriptNameLocal.toLowerCase() !==
                    language.scriptNameEnglish.toLowerCase()) && (
                  <>({language.scriptNameEnglish})</>
                )}
              {language.regionNameEnglish &&
                (!language.regionNameNative ||
                  language.regionNameNative.toLowerCase() !==
                    language.regionNameEnglish.toLowerCase()) && (
                  <> {language.regionNameEnglish}</>
                )}
            </span>
          )}
        </div>
      )}
      {showFlags && language.flagCodes.length > 0 && flags && (
        <FlagDisplay flagCodes={language.flagCodes} flags={flags} size="lg" />
      )}
    </div>
  );
};

