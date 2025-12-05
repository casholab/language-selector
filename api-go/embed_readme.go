package main

import (
	"net/http"
)

const embedReadmeContent = `Casholab Language Selector - Embed Widget
==========================================

A drop-in language selector widget you can add to any website with a single script tag.

Installation
------------

Add the following to your HTML:

  <script src="https://lsapi.casholab.com/embed/loader.js"></script>

Basic Usage
-----------

Add an element with the casholab-ls attribute:

  <div casholab-ls languages="en,es,fr,de"></div>

Or use the id:

  <div id="casholab-ls" languages="en,es,fr,de"></div>

Languages
---------

Uses BCP-47 language codes (xx-Xxxx-XX | language-script-region)

Examples:
  - Basic: "en", "es", "fr", "de"
  - With region: "es-CO", "es-ES", "en-US", "en-GB"  
  - With script: "sr-Latn", "sr-Cyrl", "zh-Hans", "zh-Hant"
  - Full tag: "zh-Hans-CN", "zh-Hant-TW"

More info: https://developer.mozilla.org/en-US/docs/Glossary/BCP_47_language_tag

Configuration Attributes
------------------------

| Attribute         | Type    | Default                      | Description                          |
|-------------------|---------|------------------------------|--------------------------------------|
| languages         | string  | (required)                   | Comma-separated BCP-47 language codes|
| is-modal          | boolean | true                         | true = modal, false = dropdown       |
| flag-mode         | string  | "none"                       | "none", "single", or "all"           |
| show-english-name | boolean | true                         | Show English name alongside endonym  |
| button-size       | string  | "lg"                         | "sm" or "lg"                         |
| api-url           | string  | "https://lsapi.casholab.com" | Custom API endpoint                  |
| flag-load-mode    | string  | "multi"                      | "single" (all-flags) or "multi"      |
| callback          | string  | (none)                       | Global function name to call on select|

Examples
--------

Modal with flags:

  <div casholab-ls 
    languages="en,es,fr,zh-Hans,zh-Hant,ar"
    flag-mode="all"
    is-modal="true"
  ></div>

Dropdown without flags:

  <div casholab-ls 
    languages="en,es,fr"
    is-modal="false"
    flag-mode="none"
  ></div>

With callback:

  <script>
    function onLanguageSelected(code) {
      console.log('Selected:', code);
    }
  </script>
  <div casholab-ls 
    languages="en,es,fr"
    callback="onLanguageSelected"
  ></div>

Custom API endpoint:

  <div casholab-ls 
    languages="en,es"
    api-url="https://your-api.example.com"
  ></div>

Flag Loading Modes
------------------

- "multi" (default): Fetches individual flags concurrently. Best for few languages.
- "single": Fetches all flags in one request. Better for many languages or 
            environments with limited concurrent requests.

Self-Hosting
------------

You can host your own API using the Go or Cloudflare Workers implementations:
- Go: https://github.com/casholab/language-selector/tree/main/api-go

Features
--------

- Supports 7000+ languages, 400+ endonyms, regions, scripts
- Dark mode and light mode support
- Efficient lazy loading (data fetched on hover/open)
- No dependencies
- Under 40kB load size

Issues
------

Report issues at: https://github.com/casholab/language-selector/issues
`

func (s *Server) HandleEmbedReadme(w http.ResponseWriter, r *http.Request) {
	if r.Method == http.MethodOptions {
		s.corsHeaders(w)
		w.WriteHeader(http.StatusOK)
		return
	}

	if r.Method != http.MethodGet {
		s.errorResponse(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	s.corsHeaders(w)
	w.Header().Set("Content-Type", "text/plain; charset=utf-8")
	w.WriteHeader(http.StatusOK)
	w.Write([]byte(embedReadmeContent))
}
