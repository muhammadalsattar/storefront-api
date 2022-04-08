-- Up Migration
CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  product_id INTEGER NOT NULL,
  quantity INTEGER NOT NULL,
  status TEXT NOT NULL,
  CONSTRAINT fK_user FOREIGN KEY (user_id) REFERENCES users(id),
  CONSTRAINT fK_product FOREIGN KEY (product_id) REFERENCES products(id)
);
-- Down Migration
DROP TABLE orders;