package repository

import (
	"database/sql"
	"digital-ekub-pro/server/internal/models"
)

// UserRepository holds the database connection
type UserRepository struct {
	db *sql.DB
}

// NewUserRepository initializes the repository
func NewUserRepository(db *sql.DB) *UserRepository {
	return &UserRepository{db: db}
}

// CreateUser handles the SQL for adding a member
func (r *UserRepository) CreateUser(u *models.User) error {
	query := `INSERT INTO users (id, full_name, email, password_hash, role, trust_score) 
	          VALUES ($1, $2, $3, $4, $5, $6)`
	_, err := r.db.Exec(query, u.ID, u.FullName, u.Email, u.PasswordHash, u.Role, u.TrustScore)
	return err
}