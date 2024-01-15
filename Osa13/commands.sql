CREATE TABLE blogs (
    id SERIAL PRIMARY KEY,
    author VARCHAR(255),
    url VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL,
    likes INTEGER DEFAULT 0
);

INSERT INTO blogs (author, url, title, likes)
VALUES ('John Doe', 'https://example.com/blog1', 'Blog Title 1', 5);

INSERT INTO blogs (author, url, title, likes)
VALUES ('Jane Smith', 'https://example.com/blog2', 'Blog Title 2', 10);

these are for development purposes 

INSERT INTO users (username, name, admin, disabled)
VALUES
  ('user1@example.com', 'User 1', false, false),
  ('user2@example.com', 'User 2', false, false);

INSERT INTO blogs (title, url, likes, author, year)
VALUES
   ('Blog 1', 'https://example.com/blog1', 10, 'User 1', 1995),
   ('Blog 2', 'https://example.com/blog2', 5, 'User 1', 2000),
   ('Blog 3', 'https://example.com/blog3', 15, 'User 2', 2005),
   ('Blog 4', 'https://example.com/blog4', 7, 'User 2', 2010);

DROP TABLE IF EXISTS blogs;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS migrations;
DROP TABLE IF EXISTS reading_lists;
