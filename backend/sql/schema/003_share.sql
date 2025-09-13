-- +goose Up
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

ALTER TABLE snippets 
ADD COLUMN public BOOLEAN DEFAULT FALSE,
ADD COLUMN share_id UUID NOT NULL DEFAULT gen_random_uuid();

-- +goose Down
ALTER TABLE snippets 
DROP COLUMN public,
DROP COLUMN share_id;