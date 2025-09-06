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
SELECT * from snippets
WHERE user_id = $1
ORDER BY created_at DESC;


-- name: GetSpecificSnippet :one
SELECT * from snippets
WHERE user_id = $1
AND id = $2;

-- name: UpdateSnippet :one
UPDATE snippets
SET title = $1,
code = $2,
language = $3,
tags = $4,
updated_at = NOW()
WHERE user_id = $5
AND id = $6 
RETURNING *;


-- name: DeleteSnippet :exec
DELETE from snippets
WHERE user_id = $1
AND id = $2;

-- name: FilterSnippets :many
SELECT * FROM snippets
WHERE user_id = $1 -- user_id
AND ( ($2::text IS NULL OR title ILIKE '%' || $2 || '%' OR code ILIKE '%' || $2 || '%') ) -- search
AND ( cardinality($3::text[]) = 0 OR tags && $3::text[] ) -- tags
AND ( $4::text IS NULL OR language = $4 ) -- language
ORDER BY created_at DESC
LIMIT $5 -- limit
OFFSET $6; -- offset




