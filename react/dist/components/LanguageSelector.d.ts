import { default as React } from 'react';
import { LanguageCode, DisplayOptions, LoadOptions } from '../types';
interface LanguageSelectorProps {
    languages: string[];
    displayOptions?: DisplayOptions;
    loadOptions?: LoadOptions;
    selectedLanguage?: LanguageCode | null;
    onSelectedLanguageChange?: (language: LanguageCode | null) => void;
    onSelection?: (language: LanguageCode) => void;
}
export declare const LanguageSelector: React.FC<LanguageSelectorProps>;
export {};
//# sourceMappingURL=LanguageSelector.d.ts.map