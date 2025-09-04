-- name: CreateSnippet :one
INSERT INTO snippets (
    id, 
    title, 
    code, 
    language, 
    tags, 
    created_at, 
    updated_at, 
    user_id)
VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
RETURNING *;


-- name: GetSnippetsOfUser :many
SELECT snippets.* from snippets
WHERE snippets.user_id = $1
ORDER BY snippets.created_at DESC;

