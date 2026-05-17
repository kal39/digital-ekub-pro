package utils

import (
	"github.com/google/uuid" // Run: go get github.com/google/uuid
)

// GenerateID creates a unique UUID string for database primary keys
func GenerateID() string {
	return uuid.New().String()
}

// ValidateEmail (Placeholder for more complex logic)
func IsValidEmail(email string) bool {
	// Add regex or validation logic here
	return len(email) > 5
}
