-- name: CreateSnippet :one
INSERT INTO snippets (id, title, code, language, tags, created_at, updated_at, user_id)
VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
RETURNING *;


-- name: GetSnippets :many
SELECT * from snippets;

