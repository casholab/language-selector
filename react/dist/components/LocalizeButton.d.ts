import { default as React } from 'react';
import { DisplayLanguage } from '../language-selector';
interface LocalizeButtonProps {
    text?: string;
    size?: 'sm' | 'lg';
    onClick?: () => void;
    onMouseEnter?: () => void;
    selectedLanguage?: DisplayLanguage | null;
    displaySelected?: boolean;
    showFlag?: boolean;
}
export declare const LocalizeButton: React.FC<LocalizeButtonProps>;
export {};
//# sourceMappingURL=LocalizeButton.d.ts.map