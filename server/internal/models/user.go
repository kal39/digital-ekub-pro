package models

import "time"

type User struct {
	ID           string    `json:"id"`
	FullName     string    `json:"fullName"`
	Email        string    `json:"email"`
	PasswordHash string    `json:"-"`
	Role         string    `json:"role"`
	TrustScore   int       `json:"trustScore"`
	CreatedAt    time.Time `json:"createdAt"`
}
