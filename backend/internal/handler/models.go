package handler

import (
	"backend/internal/database"
	"time"

	"github.com/google/uuid"
)


type User struct {
	ID        uuid.UUID	`json:"id"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
	Username  string	`json:"username"`
	Email     string	`json:"email"`
	Password  string	`json:"password"`
}

type Snippet struct {
	ID        uuid.UUID `json:"id"`
	Title     string    `json:"title"`
	Code      string    `json:"code"`
	Language  string    `json:"language"`
	Tags      []string  `json:"tags"`
	Public    bool      `json:"public"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
	UserID    uuid.UUID `json:"user_id"`
	ShareID   uuid.UUID `json:"share_id"`
}

func databaseUserToUser(dbUser database.User) User {
	return User{
		ID: dbUser.ID,
		CreatedAt: dbUser.CreatedAt,
		UpdatedAt: dbUser.UpdatedAt,
		Username: dbUser.Username,
		Email: dbUser.Email,
		Password: dbUser.Password,
	}
}

func databaseSnippetToSnippet(dbSnippet database.Snippet) Snippet {
	return Snippet{
		ID:        dbSnippet.ID,
		Title: dbSnippet.Title,
		Code: dbSnippet.Code,
		Language: dbSnippet.Language,
		Tags: dbSnippet.Tags,
		Public: dbSnippet.Public.Valid && dbSnippet.Public.Bool,
		CreatedAt: dbSnippet.CreatedAt,
		UpdatedAt: dbSnippet.UpdatedAt,
		UserID: dbSnippet.UserID,
		ShareID: dbSnippet.ShareID,
	}
}

func databaseSnippetsToSnippets(dbSnippets []database.Snippet) []Snippet {
	snippets := []Snippet{}
	for _, dbSnippet := range dbSnippets {
		snippets = append(snippets, databaseSnippetToSnippet(dbSnippet))
	}
	return snippets
}


func databasePublicToPublic(dbSnippet database.Snippet) Snippet {
	return Snippet{
		Title: dbSnippet.Title,
		Code: dbSnippet.Code,
		Language: dbSnippet.Language,
		Tags: dbSnippet.Tags,
	}
}


