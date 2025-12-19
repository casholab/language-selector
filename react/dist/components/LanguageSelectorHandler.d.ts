import { default as React } from 'react';
import { LanguageLookupResult, DisplayOptions, LoadOptions } from '../types';
import { DisplayLanguage } from '../language-selector';
interface LanguageSelectorHandlerProps {
    staticData?: LanguageLookupResult;
    languages?: string[];
    displayOptions?: DisplayOptions;
    loadOptions?: LoadOptions;
    selectedLanguage?: DisplayLanguage | null;
    onSelectedLanguageChange?: (language: DisplayLanguage | null) => void;
    onSelection?: (language: DisplayLanguage) => void;
}
export declare const LanguageSelectorHandler: React.FC<LanguageSelectorHandlerProps>;
export {};
//# sourceMappingURL=LanguageSelectorHandler.d.ts.map