package utils

import (
	"database/sql"
	"fmt"
	"log"
)

func SeedDatabase(db *sql.DB) {
	// Create a mock admin user
	id := "550e8400-e29b-41d4-a716-446655440000" // Static UUID for testing
	query := `INSERT INTO users (id, full_name, email, password_hash, role) 
	          VALUES ($1, 'Abebe Kebede', 'abebe@example.com', 'hashed_pass', 'admin')
	          ON CONFLICT (email) DO NOTHING`

	_, err := db.Exec(query, id)
	if err != nil {
		log.Println("Seeding error:", err)
	} else {
		fmt.Println("🌱 Database seeded with mock admin user.")
	}
}
