CREATE TABLE IF NOT EXISTS post (
    id int unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title text NOT NULL,
    body text,
    createdAt DATETIME DEFAULT NOW(),
    likes int DEFAULT 0,
    username VARCHAR(255) NOT NUll,
    attachments text,
    FOREIGN KEY (username) REFERENCES user(username)
);

-- Required: id, title, username reference. createdAt is given by DEFAULT
-- Not required: body, likes, attachments(URL) 