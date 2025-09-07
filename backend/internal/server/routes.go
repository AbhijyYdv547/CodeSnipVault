package server

import (
	"backend/internal/handler"

	"github.com/go-chi/chi/v5"
)

func routerHandler(r *chi.Mux, apiCfg *handler.ApiConfig) {
	r.Route("/v1", func(r chi.Router) {
		r.Route("/auth", func(r chi.Router) {
			r.Post("/signup", apiCfg.SignupHandler)
			r.Post("/login", apiCfg.LoginHandler)
		})

		r.Route("/snippets", func(r chi.Router) {
			r.Post("/create", apiCfg.MiddlewareAuth(apiCfg.CreateSnippetHandler))
			r.Get("/", apiCfg.MiddlewareAuth(apiCfg.GetAllSnippetsHandler))
			r.Get("/{id}", apiCfg.MiddlewareAuth(apiCfg.GetSnippetHandler))
			r.Patch("/{id}", apiCfg.MiddlewareAuth(apiCfg.UpdateSnippetHandler))
			r.Delete("/{id}", apiCfg.MiddlewareAuth(apiCfg.DeleteSnippetHandler))
		})
	})
}
