-- name: CreateUser :one
INSERT INTO users (created_at, updated_at, username, email, password)
VALUES ($1, $2, $3, $4, $5)
RETURNING *;

-- name: GetUserByEmail :one
SELECT * FROM users WHERE email = $1;

-- name: GetUserByUsername :one
SELECT * FROM users WHERE username = $1;

-- name: GetUserById :one
SELECT * FROM users WHERE id = $1;

-- name: UpdateUser :one
UPDATE users
SET username = $1,
email = $2,
updated_at = NOW()
WHERE id = $3
RETURNING *;