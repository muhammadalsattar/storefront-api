-- Up Migration
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  price REAL NOT NULL,
  category_id INTEGER NOT NULL,
  CONSTRAINT fK_category FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE ON UPDATE CASCADE
);

-- Down Migration
DROP TABLE products;