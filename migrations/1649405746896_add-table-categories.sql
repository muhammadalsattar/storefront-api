-- Up Migration
CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL UNIQUE
);
-- Down Migration
DROP TABLE categories;