import { default as React } from 'react';
import { DisplayOptions } from '../types';
import { DisplayLanguage } from '../language-selector';
interface LanguageSelectorStaticProps {
    staticFileData: string | object;
    selectedLanguage?: DisplayLanguage | null;
    onSelectedLanguageChange?: (language: DisplayLanguage | null) => void;
    onSelection?: (language: DisplayLanguage) => void;
    displayOptions?: DisplayOptions;
}
export declare const LanguageSelectorStatic: React.FC<LanguageSelectorStaticProps>;
export {};
//# sourceMappingURL=LanguageSelectorStatic.d.ts.map