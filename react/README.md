# casholab react language selector library

A comprehensive language selector library, so you never have to think about it again. 

## Installation

```bash
npm install language-selector-react

pnpm install language-selector-react
```
## Features 
- Support for static files for offline mode. 
- Supports 7000+ languages 400+ endonyms, regions, scripts, 
- Darkmode and light mode. 
- Efficient loading. 
- Batch loading for sequential fetch environments.
- Customizable display options.
- Auto-select browser locale.
- Display selected language on button with flag.

## Basic Usage

```tsx
import { useState } from 'react';
import { LanguageSelector } from 'language-selector-react';
import type { DisplayLanguage } from 'language-selector-react';
import 'language-selector-react/styles.css';

function App() {
    const [selectedLanguage, setSelectedLanguage] = useState<DisplayLanguage | null>(null);
    
    function handleSelection(language: DisplayLanguage) {
        console.log("Selected Language: ", language.code, language.endonym);
    }

    return (
        <>
            <LanguageSelector 
                languages={["en", "es", "fr", "de"]} 
                onSelection={handleSelection}
            />
            
            <LanguageSelector 
                selectedLanguage={selectedLanguage}
                onSelectedLanguageChange={setSelectedLanguage}
                languages={["en", "es", "fr", "id", "zh-Hans", "zh-TW", "sr-Cryl-RS"]} 
                displayOptions={{isModal: false, flagMode: "all", buttonSize: "sm", showEnglishName: true}} 
                loadOptions={{apiUrl: "https://customapi.com", flagLoadMode: "single"}}
            /> 

            <div>Selected: {selectedLanguage?.code} - {selectedLanguage?.endonym}</div>
        </>
    );
}
```

Options Example
```tsx
<LanguageSelector 
    selectedLanguage={selectedLanguage}
    onSelectedLanguageChange={setSelectedLanguage}
    languages={["en", "es", "fr", "id", "zh-Hans", "zh-TW"]}
    displayOptions={{
        isModal: false,           // modal or dropdown
        flagMode: "all",          // "all" | "single" | "none"
        buttonSize: "sm",         // "sm" | "lg"
        showEnglishName: true,    // show English name alongside native
        placeholderText: "Language",  // button text when nothing selected
        displaySelected: true     // show selected language on button
    }} 
    loadOptions={{
        apiUrl: "https://customapi.com",
        flagLoadMode: "single",   // "single" | "multi"
        autoSelect: true          // auto-select browser locale
    }}
/>
```

### languages
Uses bcp-47 language codes (with fallback support for names and endonyms)\
(xx-Xxxx-XX-xyz | language-script-region-variants/extensions)
example : "en", "es", "zh-TW", "zh-Hans-CN" 
example with regions: "es-CO", "es-ES"
example with scripts: "en-Latn", "es-Latn", "sr-Latn", "sr-Cyrl"
example with regions and scripts: "zh-Hans-CN", "zh-Hans-TW"

https://developer.mozilla.org/en-US/docs/Glossary/BCP_47_language_tag for more information on language codes or https://cldr.unicode.org/index/bcp47-extension

### controlled state

selectedLanguage: DisplayLanguage | null
onSelectedLanguageChange: (language: DisplayLanguage | null) => void

The `DisplayLanguage` object contains:
- `code`: BCP-47 language code
- `name`: English name
- `endonym`: Native name
- `regionNameEnglish?`: English region name
- `regionNameNative?`: Native region name
- `scriptNameEnglish?`: English script name
- `scriptNameLocal?`: Native script name
- `flagSvgDataUris`: Array of flag SVG data URIs

### callback function

onSelection: (language: DisplayLanguage) => void

Returns the full DisplayLanguage object for the selected language.


### options

#### displayOptions

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| isModal | boolean | true | Show as modal overlay or inline dropdown |
| flagMode | "none" \| "single" \| "all" | "single" | How flags are displayed |
| buttonSize | "sm" \| "lg" | "lg" | Button size |
| showEnglishName | boolean | false | Show English name alongside native name |
| placeholderText | string | "Language" | Button text when nothing selected |
| displaySelected | boolean | false | Show selected language name and flag on button |

#### loadOptions
| Option | Type | Default | Description |
|--------|------|---------|-------------|
| apiUrl | string | "https://lsapi.casholab.com" | API endpoint URL |
| flagLoadMode | "single" \| "multi" | "multi" | Load flags individually or batch |
| autoSelect | boolean | false | Auto-select matching browser locale on mount |

### Utility Functions

```typescript
import { getBrowserLocales, findMatchingLanguage } from "language-selector-react";

// Get browser's preferred locales
const locales = getBrowserLocales(); // ["en-US", "en", "fr"]

// Find matching language from available options
const match = findMatchingLanguage(locales, displayLanguages);
```


## Configuration

You can either use the public remote api endpoint or you can download and host your own config or you can host your own public api 

### API Endpoint

Current Public API Endpoint is at lsapi.casholab.com

This is a public endpoint, we will try our best to maintain it but it could go down if traffic is too much, we encourage you to use static file if you need 100% reliability. You can generate a static file by using the  lsapi.casholab.com/file/generate endpoint (do a get request to see the notes on the request structure/parameters)

#### Custom API Endpoint

You can host your own api endpoint using cloudflare workers or golang see the api-go and api-cf-d1-workers repos.
https://github.com/casholab/language-selector/api-go and https://github.com/casholab/language-selector/api-cf-d1-workers

### flag considerations

Flags are large assets and thus can be either loaded remotly or downloaded as embedded svgs in the json file. Again this choice is up to the developer. the package loads flags through individual requests by default. If you are on a js enviornment that does not allow for concurrent requests and are loading many flags you can use the option to load every flag /all-flags and they will be loaded as a single file and parsed. This can be helpful for load speed in mobile envioronments due to per request constraints although it does use more data as you are loading 6MB of svg files. 


## Testing

No testing built for this library. All testing is done manually.

## Issues

If you find an issue add it to the github issues library 
https://github.com/casholab/language-selector/react/issues


## Styling

You can override styling by looking at the source css file and using !important to override the class. Or you can manually update the css. 

### fonts
Fonts are not included but we recommend making sure your font supports the scripts and languages you are using.

We like Noto Sans for its wide coverage of scripts and languages.
https://fonts.google.com/noto/sans/

### colors

You can override colors by looking at the source css file and using !important to override the color. Or you can manually update the css.



## Database Data Source.

Data pulled from casholab/languages database 
github:https://github.com/casholab/languages
