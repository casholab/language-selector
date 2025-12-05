import React from 'react';
import { svgToDataUri } from '../language-selector';
import styles from './FlagDisplay.module.css';

interface FlagDisplayProps {
  flagCodes: string[];
  flags?: Record<string, string>;
  size?: 'sm' | 'md' | 'lg';
}

export const FlagDisplay: React.FC<FlagDisplayProps> = ({
  flagCodes,
  flags,
  size = 'md',
}) => {
  if (flagCodes.length === 0 || !flags) return null;

  const layoutClass =
    flagCodes.length > 2 ? 'grid' : flagCodes.length === 2 ? 'row' : 'single';

  return (
    <div className={`${styles.flags} ${styles[layoutClass]} ${styles[size]}`}>
      {flagCodes.map((flagCode) => {
        const svg = flags[flagCode] ?? flags[flagCode.toLowerCase()];
        if (!svg) return null;
        return (
          <img
            key={flagCode}
            className={styles.flag}
            src={svgToDataUri(svg)}
            alt=""
            title={flagCode}
          />
        );
      })}
    </div>
  );
};

