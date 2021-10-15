CREATE TABLE IF NOT EXISTS polls (
    id TEXT NOT NULL UNIQUE,
    admin_pwd TEXT NOT NULL DEFAULT '',
    question TEXT NOT NULL,
    options TEXT NOT NULL,
    votes TEXT NOT NULL,
    ips TEXT NOT NULL DEFAULT '[]',
    settings TEXT NOT NULL,
    PRIMARY KEY(id)
)