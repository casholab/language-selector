import { default as React } from 'react';
import { DisplayLanguage } from '../language-selector';
interface DropdownOptionProps {
    language: DisplayLanguage;
    showFlags?: boolean;
    showEnglishName?: boolean;
    selected?: boolean;
    onClick?: () => void;
}
export declare const DropdownOption: React.FC<DropdownOptionProps>;
export {};
//# sourceMappingURL=DropdownOption.d.ts.map