package middleware

import "net/http"

func LoggingMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// Log every single request to the backend for security auditing
		println("REQ:", r.Method, r.URL.Path)
		next.ServeHTTP(w, r)
	})
}