import React, { useEffect, useRef } from 'react';
import { SearchIcon } from '../icons';
import styles from './SearchInput.module.css';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  variant?: 'default' | 'compact';
  autoFocus?: boolean;
  onKeyDown?: (e: React.KeyboardEvent) => void;
}

export const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
  placeholder = 'Search languages...',
  variant = 'default',
  autoFocus = false,
  onKeyDown,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  if (variant === 'default') {
    return (
      <label htmlFor="ls-search" className={styles.search}>
        <SearchIcon width="18" height="18" />
        <input
          ref={inputRef}
          id="ls-search"
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={onKeyDown}
        />
      </label>
    );
  }

  return (
    <div className={styles.searchCompact}>
      <SearchIcon width="16" height="16" />
      <input
        ref={inputRef}
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={onKeyDown}
      />
    </div>
  );
};

