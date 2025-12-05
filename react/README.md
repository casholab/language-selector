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

## Basic Usage

```tsx
import { LanguageSelector } from 'language-selector-react';
import 'language-selector-react/styles.css';

function App() {
    const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
    
    function handleSelection(language: string) {
        console.log("Selected Language: ", language);
        // do something with the language code
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

            <div>Selected Language: {selectedLanguage}</div>
        </>
    );
}
```
Options Example
```tsx
<LanguageSelector 
    selectedLanguage={selectedLanguage}
    onSelectedLanguageChange={setSelectedLanguage}
    languages={["en", "es", "fr", "id", "zh-Hans", "zh-TW"]} // BCP-47 language codes
    displayOptions={{
        isModal: false, // modal or dropdown
        flagMode: "all", // "all" | "single" | "none"
        buttonSize: "sm", // "sm" | "lg"
        showEnglishName: true // true | false
    }} 
    loadOptions={{
        apiUrl: "https://customapi.com", // optional custom API
        flagLoadMode: "single" // "single" | "multi"
    }}
/>
```

### languages
Uses bcp-47 language codes (although also has falls back for names and endonyms)\
(xx-Xxxx-XX-xyz | language-script-region-variants/extensions)
example : "en", "es", "zh-TW", "zh-Hans-CN" 
example with regions: "es-CO", "es-ES"
example with scripts: "en-Latn", "es-Latn", "sr-Latn", "sr-Cyrl"
example with regions and scripts: "zh-Hans-CN", "zh-Hans-TW"

https://developer.mozilla.org/en-US/docs/Glossary/BCP_47_language_tag for more information on language codes or https://cldr.unicode.org/index/bcp47-extension

### controlled state

selectedLanguage: LanguageCode | null
onSelectedLanguageChange: (language: LanguageCode | null) => void

### callback function

onSelection: (language: LanguageCode) => void

returns back the bcp-47 language code of the selected language


### options

#### displayOptions

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| isModal | boolean | true | Whether to show the modal or dropdown |
| flagMode | string | "all" | The flag mode to use | "none", "single", "all" |
| buttonSize | string | "lg" | The button size to use | "sm", "lg" |
| showEnglishName | boolean | true | Whether to show the english names |

#### loadOptions
| Option | Type | Default | Description |
|--------|------|---------|-------------|
| apiUrl | string | "https://lsapi.casholab.com" | The api url to use |
| flagLoadMode | FlagLoadMode: "single" \\ "multi  | The flag load mode to use |


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

