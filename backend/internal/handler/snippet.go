package handler

import (
	"backend/internal/database"
	"encoding/json"
	"fmt"
	"net/http"
	"time"

	"github.com/google/uuid"
)

func (apiCfg *ApiConfig) HandlerCreateSnippet(w http.ResponseWriter, r *http.Request, user database.User) {
	type parameters struct {
		Title    string   `json:"title"`
		Code     string   `json:"code"`
		Language string   `json:"language"`
		Tags     []string `json:"tags"`
	}
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


func (apiCfg *ApiConfig) HandlerGetAllSnippets(w http.ResponseWriter, r *http.Request, user database.User) {
	snippets, err := apiCfg.DB.GetSnippetsOfUser(r.Context(), user.ID)
	if err != nil {
		respondWithError(w, 400, fmt.Sprintf("Couldn't get snippets: %v", err))
		return
	}

	respondWithJSON(w, 201, snippets)

}
