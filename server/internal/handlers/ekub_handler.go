package handlers

import (
	"net/http"
)

func GetEkubsHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.Write([]byte(`{"message": "Ekub list placeholder"}`))
}
