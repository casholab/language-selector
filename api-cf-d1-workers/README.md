# WARNING: DEPRECIATED
Warning this is depreceated and may not function properly. See the api-go for the currently used public api.

# language selector cloudflare d1 workers api

A Cloudflare Workers API for accessing language, script, region, and flag data.

## Endpoints

### Health Check
```
GET /
GET /health
```
Returns API status and available endpoints.

### Language Lookup
```
GET /languages?languages=en,es,zh&flagMode=single
POST /languages
```

Lookup language data by code, name, or endonym.

**Query Parameters (GET):**
- `languages` or `l` - Comma-separated list of language inputs
- `flagMode` or `f` - Flag mode: `none`, `single`, or `all` (default: `none`)

**Request Body (POST):**
```json
{
  "languages": ["en", "es", "zh-Hans", "Japanese"],
  "flagMode": "single"
}
```

**Response:**
```json
{
  "data": {
    "eng": {
      "data": {
        "code": "eng",
        "name": "English",
        "terminologyCode": "eng",
        "bibliographicCode": "eng",
        "twoLetterCode": "en",
        "endonym": "English",
        "defaultDirection": "ltr",
        "spacing": null
      },
      "regionData": {
        "US": {
          "regionCode": "US",
          "regionNameEnglish": "United States",
          "regionNameNative": "United States",
          "languageNameInRegion": "English"
        }
      },
      "flags": ["us", "gb"]
    }
  },
  "resolved": ["eng"],
  "normalized": { "en": "eng" },
  "invalid": [],
  "flags": {
    "us": "<svg>...</svg>",
    "gb": "<svg>...</svg>"
  }
}
```

### Static Language File
```
GET /languages/file?languages=en,es&flagMode=single
POST /languages/file
```

Generate a complete static file for embedded use.

**Query Parameters (GET):**
- `languages` or `l` - Comma-separated list of language inputs
- `flagMode` or `f` - Flag mode: `none`, `single`, or `all`
- `buttonSize` - `sm` or `lg`
- `isModal` - `true` or `false`
- `confirmSelection` - `true` or `false`
- `showEnglishName` - `true` or `false`

**Request Body (POST):**
```json
{
  "languages": ["en", "es"],
  "flagMode": "single",
  "options": {
    "buttonSize": "lg",
    "isModal": true,
    "showEnglishName": true
  }
}
```

**Response:**
```json
{
  "meta": {
    "generatedAt": "2024-12-03T12:00:00.000Z",
    "version": "1.0"
  },
  "options": {
    "buttonSize": "lg",
    "isModal": true,
    "showEnglishName": true,
    "flagMode": "single"
  },
  "result": { ... }
}
```

### Flag SVG
```
GET /flags/:code
```

Get a flag SVG by country code.

**Example:**
```
GET /flags/us
```

**Response:** SVG image with `Content-Type: image/svg+xml`

### Quick Start


## Language Input Formats

The API accepts various language input formats:
- ISO 639-1 codes: `en`, `es`, `zh`
- ISO 639-2/T codes: `eng`, `spa`, `zho`
- ISO 639-3 codes: `eng`, `spa`, `cmn`
- BCP 47 tags: `en-US`, `zh-Hans`, `sr-Latn`
- Language names: `English`, `Spanish`, `Chinese`
- Endonyms: `Español`, `中文`, `日本語`


## Setup

### Prerequisites
- Node.js 18+
- pnpm
- Cloudflare account with Workers enabled


### D1 Database Setup

1. Create a D1 database:
```bash
wrangler d1 create db-name
```

2. Update `wrangler.toml` with the database ID from the output.

3. Import your SQLite database:
```bash
# Export your local SQLite to SQL
sqlite3 /path/to/database.db .dump > dump.sql

# cleanup the sql dump to remove the transaction and parse the svg files into their builder insert statments to avoid file size limit 
bash cleanup-sql.sh

# Import to D1 (may need to split large files)
wrangler d1 execute db-name --remote --file=dump.sql
```
