import React from 'react';
import styles from './FlagDisplay.module.css';

interface FlagDisplayProps {
  flagSvgDataUris: string[];
  size?: 'sm' | 'md' | 'lg';
}

export const FlagDisplay: React.FC<FlagDisplayProps> = ({
  flagSvgDataUris,
  size = 'md',
}) => {
  if (flagSvgDataUris.length === 0) return null;

  const layoutClass =
    flagSvgDataUris.length > 2 ? 'grid' : flagSvgDataUris.length === 2 ? 'row' : 'single';

  return (
    <div className={`${styles.flags} ${styles[layoutClass]} ${styles[size]}`}>
      {flagSvgDataUris.map((uri, index) => (
        <img
          key={index}
          className={styles.flag}
          src={uri}
          alt=""
        />
      ))}
    </div>
  );
};
