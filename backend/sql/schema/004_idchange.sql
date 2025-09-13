-- +goose Up
ALTER TABLE users 
ALTER COLUMN id SET DEFAULT gen_random_uuid();

ALTER TABLE snippets
ALTER COLUMN id SET DEFAULT gen_random_uuid();

-- +goose Down
ALTER TABLE users 
ALTER COLUMN id DROP DEFAULT;

ALTER TABLE snippets
ALTER COLUMN id DROP DEFAULT;
