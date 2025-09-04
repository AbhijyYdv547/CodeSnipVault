package handler

import (
	"backend/internal/database"
	"encoding/json"
	"fmt"
	"net/http"
	"time"

	"github.com/go-chi/chi/v5"
	"github.com/google/uuid"
)

	type parameters struct {
		Title    string   `json:"title"`
		Code     string   `json:"code"`
		Language string   `json:"language"`
		Tags     []string `json:"tags"`
	}

func (apiCfg *ApiConfig) CreateSnippetHandler(w http.ResponseWriter, r *http.Request, user database.User) {

	decoder := json.NewDecoder(r.Body)

	params := parameters{}
	err := decoder.Decode(&params)
	if err != nil {
		respondWithError(w, 400, fmt.Sprintf("Error parsing JSON: %v", err))
		return
	}

	snippet, err := apiCfg.DB.CreateSnippet(r.Context(), database.CreateSnippetParams{
		ID:        uuid.New(),
		Title:     params.Title,
		Code:      params.Code,
		Language:  params.Language,
		Tags:      params.Tags,
		CreatedAt: time.Now().UTC(),
		UpdatedAt: time.Now().UTC(),
		UserID:    user.ID,
	})
	if err != nil {
		respondWithError(w, 400, fmt.Sprintf("Couldn't create snippet: %v", err))
		return
	}

	respondWithJSON(w, 201, snippet)

}

func (apiCfg *ApiConfig) GetAllSnippetsHandler(w http.ResponseWriter, r *http.Request, user database.User) {
	snippets, err := apiCfg.DB.GetSnippetsOfUser(r.Context(), user.ID)
	if err != nil {
		respondWithError(w, 400, fmt.Sprintf("Couldn't get snippets: %v", err))
		return
	}
	respondWithJSON(w, 201, snippets)
}

func (apiCfg *ApiConfig) GetSnippetHandler(w http.ResponseWriter, r *http.Request, user database.User) {
	idStr := chi.URLParam(r, "id")

	id, err := uuid.Parse(idStr)
	if err != nil {
		respondWithError(w, 400, fmt.Sprintf("No id for snippet present: %v", err))
		return
	}

	snippet, err := apiCfg.DB.GetSpecificSnippet(r.Context(), database.GetSpecificSnippetParams{
		UserID: user.ID,
		ID:     id,
	})
	if err != nil {
		respondWithError(w, 400, fmt.Sprintf("Couldn't get snippet: %v", err))
		return
	}

	respondWithJSON(w,200,snippet)
}

func (apiCfg *ApiConfig) UpdateSnippetHandler(w http.ResponseWriter, r *http.Request, user database.User) {
	idStr := chi.URLParam(r, "id")

	id, err := uuid.Parse(idStr)
	if err != nil {
		respondWithError(w, 400, fmt.Sprintf("No id for snippet present: %v", err))
		return
	}


	decoder := json.NewDecoder(r.Body)

	params := parameters{}
	err = decoder.Decode(&params)
	if err != nil {
		respondWithError(w, 400, fmt.Sprintf("Error parsing JSON: %v", err))
		return
	}

	updatedSnippet, err := apiCfg.DB.UpdateSnippet(r.Context(), database.UpdateSnippetParams{
		Title: params.Title,
		Code: params.Code,
		Language: params.Language,
		Tags: params.Tags,
		UserID: user.ID,
		ID: id,
	})
	if err != nil {
		respondWithError(w, 400, fmt.Sprintf("Error updating snippet: %v", err))
		return
	}

	respondWithJSON(w,200,updatedSnippet)
}

func (apiCfg *ApiConfig) DeleteSnippetHandler(w http.ResponseWriter, r *http.Request, user database.User) {
	idStr := chi.URLParam(r, "id")

	id, err := uuid.Parse(idStr)
	if err != nil {
		respondWithError(w, 400, fmt.Sprintf("No id for snippet present: %v", err))
		return
	}

	decoder := json.NewDecoder(r.Body)

	params := parameters{}
	err = decoder.Decode(&params)
	if err != nil {
		respondWithError(w, 400, fmt.Sprintf("Error parsing JSON: %v", err))
		return
	}

	err = apiCfg.DB.DeleteSnippet(r.Context(), database.DeleteSnippetParams{
		UserID: user.ID,
		ID: id,
	})
	if err != nil {
		respondWithError(w, 400, fmt.Sprintf("Error deleting snippet: %v", err))
		return
	}

	respondWithJSON(w,200,"Snippet Deleted")
}
