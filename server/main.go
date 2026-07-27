package main

import (
	"encoding/json"
	"log"
	"net/http"
	"os"

	"digital-ekub-pro/server/internal/repository"
)

func applyCORS(next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		allowedOrigin := os.Getenv("ALLOWED_ORIGIN")
		if allowedOrigin == "" {
			allowedOrigin = "*"
		}
		w.Header().Set("Access-Control-Allow-Origin", allowedOrigin)
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")

		if r.Method == "OPTIONS" {
			w.WriteHeader(http.StatusOK)
			return
		}

		next(w, r)
	}
}

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	// Initialize Database Pool
	db := repository.InitDB()
	if db != nil {
		defer db.Close()
	}

	// Dynamic API Route Handlers
	http.HandleFunc("/api/v1/health", applyCORS(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(map[string]string{
			"status":  "healthy",
			"system":  "Digital Ekub Pro Engine",
			"version": "1.0.0",
		})
	}))

	log.Printf("🚀 DIGITAL EKUB PRO BACKEND LIVE ON PORT %s\n", port)
	log.Fatal(http.ListenAndServe(":"+port, nil))
}
