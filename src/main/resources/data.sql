CREATE TABLE IF NOT EXISTS users (
    username VARCHAR(50) NOT NULL,
    password VARCHAR(255) NOT NULL,
    enabled BOOLEAN NOT NULL DEFAULT TRUE,
    PRIMARY KEY (username)
);

CREATE TABLE IF NOT EXISTS authorities (
    username VARCHAR(50) NOT NULL,
    authority VARCHAR(50) NOT NULL,
    PRIMARY KEY (username, authority),
    FOREIGN KEY (username) REFERENCES users(username)
);

INSERT INTO "CLIENT" (ID, VERSION, USERNAME) VALUES
(1, 1, "user");

INSERT INTO "CALENDAR_ENTRY" (ID, VERSION, DATE,CLIENT_ID,MOOD,HOURS_OF_SLEEP,NOTE) VALUES
(2, 1, '2024-04-01', 1, 0, 8, 'Slept very well. Hope to keep this up.'),
(3, 1, '2024-04-02', 1, 4, 4, 'Should have gone to bed sooner, slept terribly.');