package handler

import "backend/internal/database"

type ApiConfig struct {
	DB          *database.Queries
	JWTSecret   []byte
	FrontendURL string
	BackendURL  string
}
