package repository

import (
	"database/sql"
	"fmt"
	"log"
	"os"

	_ "github.com/lib/pq"
)

func InitDB() *sql.DB {
	// First read DATABASE_URL (Render / Neon standard)
	connStr := os.Getenv("DATABASE_URL")

	// Fallback to separate variables if DATABASE_URL is missing
	if connStr == "" {
		connStr = fmt.Sprintf("host=%s port=%s user=%s password=%s dbname=%s sslmode=disable",
			os.Getenv("DB_HOST"), os.Getenv("DB_PORT"), os.Getenv("DB_USER"), os.Getenv("DB_PASSWORD"), os.Getenv("DB_NAME"))
	}

	if connStr == "" || connStr == "host= port= user= password= dbname= sslmode=disable" {
		log.Println("⚠️ DATABASE_URL environment variable is empty.")
		return nil
	}

	db, err := sql.Open("postgres", connStr)
	if err != nil {
		log.Printf("Could not open database: %v\n", err)
		return nil
	}

	if err = db.Ping(); err != nil {
		log.Printf("⚠️ Database warning: %v\n", err)
		return nil // Prevents backend from crashing if database is sleeping
	}

	fmt.Println("✅ PostgreSQL Database connection established successfully!")
	return db
}
