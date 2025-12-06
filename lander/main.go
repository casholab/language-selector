package main

import (
	"embed"
	"log"
	"net/http"
	"os"

	"github.com/carsongh/go-sveltespa"
)

//go:embed all:build/*
var EmbeddedBuild embed.FS

func main() {

	embedHandler := sveltespa.EmbeddedRouter(EmbeddedBuild, "build", "404.html")
	PORT := os.Getenv("PORT")
	if PORT == "" {
		log.Fatal("Port is not set, set the PORT env var to start the server")
	}
	srv := http.Server{
		Handler: embedHandler,
		Addr:    ":" + PORT,
	}

	log.Println("Starting server on localhost:" + PORT)
	err := srv.ListenAndServe()
	if err != nil {
		log.Println("failed to start server with err:", err)
	}
}
