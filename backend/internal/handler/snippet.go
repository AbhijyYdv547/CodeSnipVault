package handler

import (
	"backend/internal/database"
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"strconv"
	"strings"
	"time"

	"github.com/go-chi/chi/v5"
	"github.com/google/uuid"
)

type parameters struct {
	Title    string       `json:"title"`
	Code     string       `json:"code"`
	Language string       `json:"language"`
	Tags     []string     `json:"tags"`
	Public   sql.NullBool `json:"public"`
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
		Title:     params.Title,
		Code:      params.Code,
		Language:  params.Language,
		Tags:      params.Tags,
		Public:    params.Public,
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
	page, err := strconv.Atoi(r.URL.Query().Get("page"))
	if err != nil || page < 1 {
		page = 1
	}
	offset := (page - 1) * 10

	searchStr := strings.TrimSpace(r.URL.Query().Get("search"))

	tagsParam := r.URL.Query().Get("tags")
	var tags []string
	if tagsParam != "" {
		tags = strings.Split(tagsParam, ",")
		for i, t := range tags {
			tags[i] = strings.ToLower(strings.TrimSpace(t))
		}
	}

	languageStr := strings.ToLower(strings.TrimSpace(r.URL.Query().Get("language")))

	snippets, err := apiCfg.DB.FilterSnippets(r.Context(), database.FilterSnippetsParams{
		UserID:  user.ID,
		Column2: searchStr,
		Column3: tags,
		Column4: languageStr,
		Limit:   10,
		Offset:  int32(offset),
	})

	if err != nil {
		respondWithError(w, 400, fmt.Sprintf("Couldn't get snippets: %v", err))
		return
	}

	log.Printf("FilterSnippetsParams - UserID: %v, Search: '%v', Tags: %v, Language: '%v', Limit: %d, Offset: %d",
		user.ID, searchStr, tags, languageStr, 10, offset)

	respondWithJSON(w, 200, map[string]interface{}{
		"data": snippets,
	})
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

	respondWithJSON(w, 200, snippet)
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
		Title:    params.Title,
		Code:     params.Code,
		Language: params.Language,
		Tags:     params.Tags,
		Public:   params.Public,
		UserID:   user.ID,
		ID:       id,
	})
	if err != nil {
		respondWithError(w, 400, fmt.Sprintf("Error updating snippet: %v", err))
		return
	}

	respondWithJSON(w, 200, updatedSnippet)
}

func (apiCfg *ApiConfig) DeleteSnippetHandler(w http.ResponseWriter, r *http.Request, user database.User) {
	idStr := chi.URLParam(r, "id")

	id, err := uuid.Parse(idStr)
	if err != nil {
		respondWithError(w, 400, fmt.Sprintf("No id for snippet present: %v", err))
		return
	}

	err = apiCfg.DB.DeleteSnippet(r.Context(), database.DeleteSnippetParams{
		UserID: user.ID,
		ID:     id,
	})
	if err != nil {
		respondWithError(w, 400, fmt.Sprintf("Error deleting snippet: %v", err))
		return
	}

	respondWithJSON(w, 200, "Snippet Deleted")
}

func (apiCfg *ApiConfig) GetPublicSnippetHandler(w http.ResponseWriter, r *http.Request) {
	shareStr := chi.URLParam(r, "share_id")
	shareId, err := uuid.Parse(shareStr)
	if err != nil {
		respondWithError(w, 400, fmt.Sprintf("No shareID for snippet present: %v", err))
		return
	}

	snippet, err := apiCfg.DB.GetPublicSnippet(r.Context(), shareId)
	if err != nil {
		respondWithError(w, 400, fmt.Sprintf("Error getting snippet: %v", err))
		return
	}

	respondWithJSON(w, 200, snippet)
}
