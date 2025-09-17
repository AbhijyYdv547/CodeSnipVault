package server

import (
	"backend/internal/handler"
	"fmt"
	"net/http"
	"os"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/go-chi/cors"
	"github.com/joho/godotenv"
	"github.com/swaggo/http-swagger"
)

func GetApi(apiCfg *handler.ApiConfig) http.Handler {
	r := chi.NewRouter()
	godotenv.Load()
	FRONTEND_URL := os.Getenv("FRONTEND_URL")

	if FRONTEND_URL == "" {
		fmt.Printf("Frontend url is not set")
	}

	BACKEND_URL := os.Getenv("BACKEND_URL")
	r.Use(cors.Handler(cors.Options{
		AllowedOrigins:   []string{FRONTEND_URL},
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"Accept", "Authorization", "Content-Type", "X-CSRF-Token"},
		ExposedHeaders:   []string{"Link"},
		AllowCredentials: true,
		MaxAge:           300,
	}))
	r.Use(middleware.Logger)

	routerHandler(r, apiCfg)

	if BACKEND_URL != "" {
		r.Get("/swagger/doc.json", httpSwagger.Handler(
			httpSwagger.URL(fmt.Sprintf("%s/swagger/doc.json", BACKEND_URL)),
		))
	}

	return r
}
