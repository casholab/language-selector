import { default as React } from 'react';
import { DisplayOptions } from '../types';
interface LanguageSelectorStaticProps {
    staticFileData: string | object;
    selectedLanguage?: string | null;
    onSelectedLanguageChange?: (language: string | null) => void;
    onSelection?: (language: string) => void;
    displayOptions?: DisplayOptions;
}
export declare const LanguageSelectorStatic: React.FC<LanguageSelectorStaticProps>;
export {};
//# sourceMappingURL=LanguageSelectorStatic.d.ts.map