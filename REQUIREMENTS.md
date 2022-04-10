## API Routers Endpoints
#### App
- [GET] `/cart`
    - Get authenticated user cart
    - Require authentication
    - Return array of order products
- [GET] `/orders/order/{id}`
    - Get authenticated user orders by id
    - Require authentication
    - Return array of order products
- [POST] `/purchase` <!-- require body -->
    - Request body {product_id, quantity}
    - Purchase a product
    - Require authentication
    - Return new order_product

#### Categories
- [GET] `/categories`
    - Get all categories
    - Return array of categories
- [GET] `/categories/{id}`
    - Get single category
    - Return array of categories
- [POST] `categories`
    - Create new category
    - Return the new category

#### Order_Product
- [GET] `/orderproduct/order/{id}`
    - Get single entry by order id
    - Return array of order_product
- [GET] `/orderproduct/product/{id}`
    - Get single entry by product id
    - Return array of order_product

#### Orders
- [GET] `/orders/{user_id}`
    - Get authenticated user orders
    - Require authentication
    - Return array of orders
- [GET] `/orders/{user_id}/{status}`
    - Get authenticated user orders by status
    - Require authentication
    - Return array of orders
- [POST] `/checkout/{order_id}`
    - Set user order as completed
    - Require authentication
    - Return the altered order

#### Product
- [GET] `/products`
    - Get all products
    - Return array of products
- [GET] `/products/{id}`
    - Get single product by id
    - Return single product
- [POST] `/products` <!-- require body -->
    - Request body {name, price, category_id}
    - Create new product
    - require authentication
    - return the new product
- [GET] `/products/category/{category_id}`
    - Get single product by category
    - Return array of products

#### User
- [GET] `/users`
    - Get all users
    - require authentication
    - return array of users
- [GET] `/users/{id}`
    - Get single user by id
    - require authentication
    - return single user
- [POST] `/users/login` <!-- require body -->
    - Request body {username, password}
    - Authenticate user
    - Return authenticated user with the generated token
- [POST] `/users` <!-- require body -->
    - Request body {email, username, password}
    - Create and authenticate new user
    - Return created user with the generated token
- [DELETE] `/users/{id}`
    - Delete user by id
    - Require authentication
    - Return deleted user
- [DELETE] `/users`
    - Delete all users
    - Require authentication
    - Return {}

<hr>

## Database schema with column name and type
#### categories
CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL UNIQUE
);

#### users
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email TEXT NOT NULL,
  username TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL
);

#### products
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  price REAL NOT NULL,
  category_id INTEGER NOT NULL,
  CONSTRAINT fK_category FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE ON UPDATE CASCADE
);

#### orders
CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  status TEXT NOT NULL,
  CONSTRAINT fK_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE
);

#### order_product
CREATE TABLE order_product (
  id SERIAL PRIMARY KEY,
  order_id INTEGER NOT NULL,
  product_id INTEGER NOT NULL,
  quantity INTEGER NOT NULL,
  CONSTRAINT order_product_ibfk_1 FOREIGN KEY (order_id) REFERENCES orders (id) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT order_product_ibfk_2 FOREIGN KEY (product_id) REFERENCES products (id) ON DELETE CASCADE ON UPDATE CASCADE
);