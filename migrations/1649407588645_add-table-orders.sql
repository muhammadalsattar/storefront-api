-- Up Migration
CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  status TEXT NOT NULL,
  CONSTRAINT fK_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE
);
-- Down Migration
DROP TABLE orders;