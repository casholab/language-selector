# Casho Lab Language Selector Library
This is an open source language selector that fits EVERY language, allowing for optionality in how it is displayed.

Full Landing page at: [ls.casholab.com](https://ls.casholab.com)

## Features
- Support for 7000+ languages, 400+ endonyms, regions, and scripts
- Dark mode and light mode
- Static file support for offline mode
- Efficient loading with batch loading for sequential fetch environments
- Customizable display options
- Auto-select browser locale
- Display selected language on button with flag

## Supported Frameworks
1. HTML/JS/CSS (default web standards)
   - [Embed Component API (Go)](api-go/embed-component)
   - lsapi.casholab.com/embed
2. [React](react)
3. [Svelte](svelte)

## Language Codes
Uses BCP-47 language codes (with fallback support for names and endonyms)

Format: `language-script-region-variants/extensions`

| Type | Examples |
|------|----------|
| Basic | `en`, `es`, `fr` |
| With region | `es-CO`, `es-ES`, `zh-TW` |
| With script | `en-Latn`, `sr-Latn`, `sr-Cyrl` |
| With script and region | `zh-Hans-CN`, `zh-Hans-TW` |

See [MDN BCP 47 documentation](https://developer.mozilla.org/en-US/docs/Glossary/BCP_47_language_tag) or [CLDR BCP47 Extension](https://cldr.unicode.org/index/bcp47-extension) for more information.

## Return Type

All framework libraries return a `DisplayLanguage` object on selection:

```typescript
interface DisplayLanguage {
  code: string;           // BCP-47 language code
  name: string;           // English name
  endonym: string;        // Native name
  regionNameEnglish?: string;
  regionNameNative?: string;
  scriptNameEnglish?: string;
  scriptNameLocal?: string;
  flagSvgDataUris: string[];
}
```

## Display Options

| Option | Values | Default | Description |
|--------|--------|---------|-------------|
| isModal | true, false | true | Show as modal overlay or inline dropdown |
| flagMode | "none", "single", "all" | "single" | How flags are displayed for languages with multiple regions |
| buttonSize | "sm", "lg" | "lg" | Size of the selector button |
| showEnglishName | true, false | false | Display English name alongside native name |
| placeholderText | string | "Language" | Button text when nothing selected |
| displaySelected | true, false | false | Show selected language name and flag on button |

## Load Options

| Option | Values | Default | Description |
|--------|--------|---------|-------------|
| apiUrl | string | "https://lsapi.casholab.com" | Custom API endpoint URL |
| flagLoadMode | "single", "multi" | "multi" | Load flags individually or all at once |
| autoSelect | true, false | false | Auto-select matching browser locale on mount |

## Configuration

### API Endpoint
The default public API endpoint is at `lsapi.casholab.com`

This is a public endpoint maintained on a best-effort basis. For 100% reliability, use a static file which can be generated via the `/file/generate` endpoint.

### Custom API Hosting
You can host your own API endpoint using:
- [Cloudflare Workers (D1)](api-cf-d1-workers)
- [Go Server](api-go)

### Flag Considerations
Flags are large assets that can be loaded remotely or embedded as SVGs in a JSON file. By default, flags load through individual requests. 

For environments that don't allow concurrent requests (like some mobile environments), use batch loading to fetch all flags in a single request (~6MB of SVG files). This can improve load speed despite using more data.

## Styling

Override styles by targeting the CSS classes with `!important` or by modifying the CSS directly.

### Fonts
Fonts are not included. We recommend using a font that supports your target scripts and languages.

Recommended: [Noto Sans](https://fonts.google.com/noto/sans/) for wide script coverage.

### Colors
Colors can be overridden via CSS variables or by targeting specific classes.

## Data
We use [CashoLab Languages-Data](https://github.com/casholab/languages-data) compiled list of languages which follow ISO standards for different codes, regions, and script standards.

## Issues
Report issues at [github.com/casholab/language-selector/issues](https://github.com/casholab/language-selector/issues)


## CashoLab

Casho Lab is an ai research lab focused on multilingual education.

See our website to learn more at [casholab.com](https://casholab.com)
