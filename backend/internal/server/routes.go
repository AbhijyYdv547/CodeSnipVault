package server

import (
	"net/http"

	"github.com/go-chi/chi/v5"
)

func routerHandler(r *chi.Mux) {
	r.Route("/v1", func(r chi.Router) {
		r.Get("/", func(w http.ResponseWriter, r *http.Request) {
			w.Write([]byte("Hello world"))
		})
	})
}