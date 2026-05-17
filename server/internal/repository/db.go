package repository

import (
	"database/sql"
	"fmt"
	"log"
	"os"

	_ "github.com/lib/pq" // Run: go get github.com/lib/pq
)

func InitDB() *sql.DB {
	// Using environment variables for security
	connStr := fmt.Sprintf("host=%s port=%s user=%s password=%s dbname=%s sslmode=disable",
		os.Getenv("DB_HOST"), os.Getenv("DB_PORT"), os.Getenv("DB_USER"), os.Getenv("DB_PASSWORD"), os.Getenv("DB_NAME"))

	db, err := sql.Open("postgres", connStr)
	if err != nil {
		log.Fatal("Could not connect to database:", err)
	}

	if err = db.Ping(); err != nil {
		log.Fatal("Database unreachable:", err)
	}

	fmt.Println("✅ Database connection established")
	return db
}
