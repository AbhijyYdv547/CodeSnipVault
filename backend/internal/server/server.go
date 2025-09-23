package server

import (
	"backend/internal/handler"
	"fmt"
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/go-chi/cors"
	"github.com/swaggo/http-swagger"
)

func GetApi(apiCfg *handler.ApiConfig) http.Handler {
	r := chi.NewRouter()

	if apiCfg.FrontendURL == "" {
		fmt.Printf("Frontend url is not set")
	}

	r.Use(cors.Handler(cors.Options{
		AllowedOrigins:   []string{apiCfg.FrontendURL},
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"Accept", "Authorization", "Content-Type", "X-CSRF-Token"},
		ExposedHeaders:   []string{"Link"},
		AllowCredentials: true,
		MaxAge:           300,
	}))
	r.Use(middleware.Logger)

	routerHandler(r, apiCfg)

	if apiCfg.BackendURL != "" {
		r.Get("/swagger/doc.json", httpSwagger.Handler(
			httpSwagger.URL(fmt.Sprintf("%s/swagger/doc.json", apiCfg.BackendURL)),
		))
	}

	return r
}
