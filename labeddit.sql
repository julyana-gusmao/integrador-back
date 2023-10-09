-- Active: 1696820854259@@127.0.0.1@1521
CREATE TABLE if NOT EXISTS users(
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    username TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT NOT NULL,
    created_at TEXT DEFAULT (DATETIME('now')) NOT NULL 
);

CREATE TABLE if NOT EXISTS posts(    
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    creator_id TEXT NOT NULL,
    content TEXT NOT NULL,
    likes INTEGER NOT NULL,
    dislikes INTEGER NOT NULL,
    comments INTEGER NOT NULL,
    created_at TEXT DEFAULT (DATETIME('now')) NOT NULL ,
    updated_at TEXT DEFAULT (DATETIME('now')) NOT NULL,
    FOREIGN KEY (creator_id) REFERENCES users(id)
    ON UPDATE CASCADE
    ON DELETE CASCADE  
);

CREATE TABLE if NOT EXISTS comments(
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    post_id TEXT NOT NULL,
    creator_id TEXT NOT NULL,
    content TEXT NOT NULL,
    likes INTEGER NOT NULL,
    dislikes INTEGER NOT NULL,
    created_at TEXT DEFAULT (DATETIME('now')) NOT NULL,
    updated_at TEXT DEFAULT (DATETIME('now')) NOT NULL,
    FOREIGN KEY (creator_id) REFERENCES users(id),
    FOREIGN KEY (post_id) REFERENCES posts(id)  
    ON UPDATE CASCADE
    ON DELETE CASCADE
)

CREATE TABLE if NOT EXISTS likes_dislikes_posts(    
    user_id TEXT NOT NULL,
    post_id TEXT UNIQUE NOT NULL,
    like INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id), 
    FOREIGN KEY (post_id) REFERENCES posts(id)  
    ON UPDATE CASCADE
    ON DELETE CASCADE   
);

CREATE TABLE if NOT EXISTS likes_dislikes_comments(    
    user_id TEXT NOT NULL,
    comment_id TEXT UNIQUE NOT NULL,
    like INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id), 
    FOREIGN KEY (comment_id) REFERENCES comments(id)  
    ON UPDATE CASCADE
    ON DELETE CASCADE   
);
