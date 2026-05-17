package handlers

import (
	"encoding/json"
	"net/http"
	// You downloaded this earlier
	// You downloaded this earlier
)

type LoginRequest struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

func LoginHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var req LoginRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Invalid request", http.StatusBadRequest)
		return
	}

	// TODO: Fetch user from DB and verify password using bcrypt:
	// err := bcrypt.CompareHashAndPassword([]byte(hashedPassword), []byte(req.Password))

	// Logic to return a JWT
	token := "mock_jwt_token_for_now"

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]string{
		"token":   token,
		"message": "Login successful",
	})
}
