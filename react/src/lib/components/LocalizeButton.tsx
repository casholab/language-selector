import React from 'react';
import { LanguageIcon, ChevronDownIcon } from '../icons';
import '../language-selector.css';
import styles from './LocalizeButton.module.css';

interface LocalizeButtonProps {
  text?: string;
  size?: 'sm' | 'lg';
  onClick?: () => void;
  onMouseEnter?: () => void;
}

export const LocalizeButton: React.FC<LocalizeButtonProps> = ({
  text = 'Localize',
  size = 'lg',
  onClick,
  onMouseEnter,
}) => {
  return (
    <button
      className={`${styles.btn} ${size === 'sm' ? styles.sm : ''}`}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
    >
      <LanguageIcon width="18" height="18" />
      {size === 'lg' && (
        <>
          <span>{text}</span>
          <ChevronDownIcon width="16" height="16" />
        </>
      )}
    </button>
  );
};

