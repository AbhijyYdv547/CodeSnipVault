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
	Title    string   `json:"title"`
	Code     string   `json:"code"`
	Language string   `json:"language"`
	Tags     []string `json:"tags"`
	Public   bool     `json:"public"`
}

// CreateSnippetHandler godoc
// @Summary      Create a new snippet
// @Description  Create a snippet belonging to the authenticated user
// @Tags         snippets
// @Accept       json
// @Produce      json
// @Param        request body parameters true "Snippet payload"
// @Success      201 {object} Snippet
// @Failure      400 {object} ErrorResponse
// @Router       /snippets [post]
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
		Public:    sql.NullBool{Bool: params.Public, Valid: true},
		CreatedAt: time.Now().UTC(),
		UpdatedAt: time.Now().UTC(),
		UserID:    user.ID,
	})
	if err != nil {
		respondWithError(w, 400, fmt.Sprintf("Couldn't create snippet: %v", err))
		return
	}

	respondWithJSON(w, 201, databaseSnippetToSnippet(snippet))
}

// GetAllSnippetsHandler godoc
// @Summary      Get all snippets
// @Description  Get a paginated list of snippets filtered by search, tags, or language
// @Tags         snippets
// @Produce      json
// @Param        page query int false "Page number"
// @Param        search query string false "Search string"
// @Param        tags query string false "Comma separated tags"
// @Param        language query string false "Programming language"
// @Success      200 {object} map[string][]Snippet
// @Failure      400 {object} ErrorResponse
// @Router       /snippets [get]
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
		"data": databaseSnippetsToSnippets(snippets),
	})
}

// GetSnippetHandler godoc
// @Summary      Get a specific snippet
// @Description  Get a snippet by ID belonging to the authenticated user
// @Tags         snippets
// @Produce      json
// @Param        id path string true "Snippet ID"
// @Success      200 {object} Snippet
// @Failure      400 {object} ErrorResponse
// @Router       /snippets/{id} [get]
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

	respondWithJSON(w, 200, databaseSnippetToSnippet(snippet))
}

// UpdateSnippetHandler godoc
// @Summary      Update a snippet
// @Description  Update a snippet by ID belonging to the authenticated user
// @Tags         snippets
// @Accept       json
// @Produce      json
// @Param        id path string true "Snippet ID"
// @Param        request body parameters true "Snippet payload"
// @Success      200 {object} Snippet
// @Failure      400 {object} ErrorResponse
// @Router       /snippets/{id} [put]
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
		Public:   sql.NullBool{Bool: params.Public, Valid: true},
		UserID:   user.ID,
		ID:       id,
	})
	if err != nil {
		respondWithError(w, 400, fmt.Sprintf("Error updating snippet: %v", err))
		return
	}

	respondWithJSON(w, 200, databaseSnippetToSnippet(updatedSnippet))
}

// DeleteSnippetHandler godoc
// @Summary      Delete a snippet
// @Description  Delete a snippet by ID belonging to the authenticated user
// @Tags         snippets
// @Produce      json
// @Param        id path string true "Snippet ID"
// @Success      200 {string} string "Snippet Deleted"
// @Failure      400 {object} ErrorResponse
// @Router       /snippets/{id} [delete]
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

// GetPublicSnippetHandler godoc
// @Summary      Get a public snippet
// @Description  Get a snippet by public share ID
// @Tags         snippets
// @Produce      json
// @Param        share_id path string true "Share ID"
// @Success      200 {object} Snippet
// @Failure      400 {object} ErrorResponse
// @Router       /snippets/public/{share_id} [get]
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
