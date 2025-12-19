import { default as React } from 'react';
import { DisplayLanguage } from '../language-selector';
interface LanguageOptionProps {
    language: DisplayLanguage;
    showFlags?: boolean;
    showEnglishName?: boolean;
    selected?: boolean;
    onClick?: () => void;
}
export declare const LanguageOption: React.FC<LanguageOptionProps>;
export {};
//# sourceMappingURL=LanguageOption.d.ts.map