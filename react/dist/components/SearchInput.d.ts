import { default as React } from 'react';
interface SearchInputProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    variant?: 'default' | 'compact';
    autoFocus?: boolean;
    onKeyDown?: (e: React.KeyboardEvent) => void;
}
export declare const SearchInput: React.FC<SearchInputProps>;
export {};
//# sourceMappingURL=SearchInput.d.ts.map