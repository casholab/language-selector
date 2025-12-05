import { default as React } from 'react';
import { LanguageCode } from '../types';
import { DisplayLanguage } from '../language-selector';
interface LanguageModalProps {
    displayLanguages: DisplayLanguage[];
    flags?: Record<string, string>;
    isLoading?: boolean;
    error?: Error | null;
    skeletonCount?: number;
    selectedEntry?: DisplayLanguage | null;
    isOpen: boolean;
    showEnglishName?: boolean;
    showFlags?: boolean;
    selectLanguage: (code: LanguageCode) => void;
    close: () => void;
}
export declare const LanguageModal: React.FC<LanguageModalProps>;
export {};
//# sourceMappingURL=LanguageModal.d.ts.map