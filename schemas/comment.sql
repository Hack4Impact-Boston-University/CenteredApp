CREATE TABLE comment (
    id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    content text NOT NUll,
    createdAt DATETIME DEFAULT NOW(),
    likes int DEFAULT 0,
    username VARCHAR(255) NOT NUll,
    postID int unsigned NOT NUll,
    FOREIGN KEY (username) REFERENCES user(username),
    FOREIGN KEY (postID) REFERENCES post(id) ON DELETE CASCADE
);

-- Requierd: id, content, username reference, postID reference. createdAt is given in default
-- Not required: likes(the number of likes)
