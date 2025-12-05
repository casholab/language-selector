import { default as React } from 'react';
import { LanguageCode, LanguageLookupResult, DisplayOptions, LoadOptions } from '../types';
interface LanguageSelectorHandlerProps {
    staticData?: LanguageLookupResult;
    languages?: string[];
    displayOptions?: DisplayOptions;
    loadOptions?: LoadOptions;
    selectedLanguage: LanguageCode | null;
    onSelectedLanguageChange: (language: LanguageCode | null) => void;
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    onSelection?: (language: LanguageCode) => void;
    preload?: boolean;
}
export declare const LanguageSelectorHandler: React.FC<LanguageSelectorHandlerProps>;
export {};
//# sourceMappingURL=LanguageSelectorHandler.d.ts.map