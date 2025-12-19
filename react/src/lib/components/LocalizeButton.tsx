import React from 'react';
import type { DisplayLanguage } from '../language-selector';
import { LanguageIcon, ChevronDownIcon } from '../icons';
import '../language-selector.css';
import styles from './LocalizeButton.module.css';

interface LocalizeButtonProps {
  text?: string;
  size?: 'sm' | 'lg';
  onClick?: () => void;
  onMouseEnter?: () => void;
  selectedLanguage?: DisplayLanguage | null;
  displaySelected?: boolean;
  showFlag?: boolean;
}

export const LocalizeButton: React.FC<LocalizeButtonProps> = ({
  text = 'Language',
  size = 'lg',
  onClick,
  onMouseEnter,
  selectedLanguage,
  displaySelected = false,
  showFlag = false,
}) => {
  const displayText = displaySelected && selectedLanguage
    ? selectedLanguage.endonym || selectedLanguage.name
    : text;

  const flagSrc = displaySelected && showFlag && selectedLanguage?.flagSvgDataUris?.length
    ? selectedLanguage.flagSvgDataUris[0]
    : null;

  const hasSelection = displaySelected && selectedLanguage;

  return (
    <button
      className={`${styles.btn} ${size === 'sm' ? styles.sm : ''}`}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
    >
      {size === 'lg' ? (
        <>
          {hasSelection && flagSrc ? (
            <img className={styles.flag} src={flagSrc} alt="" />
          ) : (
            <LanguageIcon width="18" height="18" />
          )}
          <span>{displayText}</span>
          <ChevronDownIcon width="16" height="16" />
        </>
      ) : (
        <>
          <LanguageIcon width="18" height="18" />
          {hasSelection && flagSrc && (
            <img className={styles.flag} src={flagSrc} alt="" />
          )}
        </>
      )}
    </button>
  );
};

