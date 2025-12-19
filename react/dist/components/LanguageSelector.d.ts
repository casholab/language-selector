import { default as React } from 'react';
import { DisplayOptions, LoadOptions } from '../types';
import { DisplayLanguage } from '../language-selector';
interface LanguageSelectorProps {
    languages: string[];
    displayOptions?: DisplayOptions;
    loadOptions?: LoadOptions;
    selectedLanguage?: DisplayLanguage | null;
    onSelectedLanguageChange?: (language: DisplayLanguage | null) => void;
    onSelection?: (language: DisplayLanguage) => void;
}
export declare const LanguageSelector: React.FC<LanguageSelectorProps>;
export {};
//# sourceMappingURL=LanguageSelector.d.ts.map