import { LanguageLookupResult, DisplayOptions, StaticLanguageFile, LoadOptions } from './types';
export declare function loadDataFromFile(input: string | object): {
    data: LanguageLookupResult;
    displayOptions: DisplayOptions | null;
};
export declare function generateStaticDataFile(languages: string[], displayOptions: DisplayOptions, loadOptions: LoadOptions): Promise<StaticLanguageFile>;
export declare function downloadStaticDataFile(file: StaticLanguageFile): void;
//# sourceMappingURL=language-file.d.ts.map