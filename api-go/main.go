package main

import (
	"database/sql"
	"embed"
	"fmt"
	"log"
	"net/http"
	"os"
	"strings"

	_ "modernc.org/sqlite"
)

//go:embed embed-component/dist/loader.js
var embedLoaderJS embed.FS

func main() {
	dbPath := os.Getenv("DB_PATH")
	if dbPath == "" {
		dbPath = "database.db"
	}

	apiVersion := os.Getenv("API_VERSION")
	if apiVersion == "" {
		apiVersion = "1.0"
	}

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	apiHost := os.Getenv("API_HOST")
	if apiHost == "" {
		apiHost = "lsapi.casholab.com"
	}

	db, err := sql.Open("sqlite", dbPath+"?mode=ro&_pragma=journal_mode(OFF)&_pragma=synchronous(OFF)&_pragma=cache_size(-64000)")
	if err != nil {
		log.Fatalf("Failed to open database: %v", err)
	}
	defer db.Close()

	if err := db.Ping(); err != nil {
		log.Fatalf("Failed to ping database: %v", err)
	}

	server := NewServer(db, apiVersion)

	mux := http.NewServeMux()

	mux.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		path := r.URL.Path
		path = strings.TrimSuffix(path, "/")
		if path == "" {
			path = "/"
		}

		switch {
		case path == "/" || path == "/health":
			server.HandleHealth(w, r)
		case path == "/languages":
			server.HandleLanguages(w, r)
		case path == "/all-flags":
			server.HandleAllFlags(w, r)
		case strings.HasPrefix(path, "/flags/"):
			server.HandleFlag(w, r)
		case path == "/embed":
			server.HandleEmbedReadme(w, r)
		case path == "/embed/loader.js":
			server.HandleEmbedLoader(w, r)
		default:
			server.errorResponse(w, "Not found", http.StatusNotFound)
		}
	})

	addr := ":" + port
	log.Printf("Language Selector API v%s starting on %s", apiVersion, addr)
	log.Printf("API Host: %s", apiHost)
	log.Printf("Database: %s (read-only)", dbPath)

	if err := http.ListenAndServe(addr, mux); err != nil {
		log.Fatalf("Server failed: %v", err)
	}
}

func init() {
	fmt.Println("Language Selector API - Go Edition")
}
