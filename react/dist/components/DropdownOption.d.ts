import { default as React } from 'react';
import { DisplayLanguage } from '../language-selector';
interface DropdownOptionProps {
    language: DisplayLanguage;
    flags?: Record<string, string>;
    showFlags?: boolean;
    showEnglishName?: boolean;
    selected?: boolean;
    onClick?: () => void;
}
export declare const DropdownOption: React.FC<DropdownOptionProps>;
export {};
//# sourceMappingURL=DropdownOption.d.ts.map