import React, { useEffect, useCallback } from 'react';
import { XIcon } from '../icons';
import '../language-selector.css';
import styles from './Modal.module.css';

interface ModalProps {
  close: () => void;
  xbutton?: boolean;
  bgCloses?: boolean;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({
  close,
  xbutton = false,
  bgCloses = true,
  children,
}) => {
  const handleBackdropClick = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (bgCloses && event.target === event.currentTarget) {
        close();
      }
    },
    [bgCloses, close]
  );

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape' && bgCloses) {
        close();
      }
    },
    [bgCloses, close]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div className={styles.outer}>
      <div
        className={styles.overlay}
        onClick={handleBackdropClick}
        aria-label="Close modal"
        role="button"
        tabIndex={0}
      />
      <div className={styles.container}>
        <div className={styles.body}>
          {xbutton && (
            <button
              className={styles.close}
              onClick={close}
              aria-label="close"
            >
              <XIcon />
            </button>
          )}
          {children}
        </div>
      </div>
    </div>
  );
};

