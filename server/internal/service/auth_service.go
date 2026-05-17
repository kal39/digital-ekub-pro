package service

import (
	"time"

	"github.com/golang-jwt/jwt/v5" // Run: go get github.com/golang-jwt/jwt/v5
	"golang.org/x/crypto/bcrypt"   // Run: go get golang.org/x/crypto/bcrypt
)

var jwtKey = []byte("your_secret_key") // In production, use os.Getenv

func HashPassword(password string) (string, error) {
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), 14)
	return string(bytes), err
}

func GenerateToken(email string, role string) (string, error) {
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"email": email,
		"role":  role,
		"exp":   time.Now().Add(time.Hour * 24).Unix(),
	})
	return token.SignedString(jwtKey)
}
