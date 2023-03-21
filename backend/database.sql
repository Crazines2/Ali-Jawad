CREATE TABLE IF NOT EXISTS users (
    id INTEGER NOT NULL,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE
);

INSERT INTO users VALUES (1, "adr", "abc@")