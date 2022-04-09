## API Routers Endpoints
#### App
- Show authenticated user cart: [GET] `/cart`
- Get single order information: [GET] `/orders/order/{id}`
- Purchase a product: [POST] `/purchase`

#### Categories
- Get all categories: [GET] `/categories`
- Show single category: [GET] `/categories/{id}`
- Create category: [POST] `categories`

#### Order_Product
- Get single entry by order id: [GET] `/orderproduct/order/{id}`
- Get single entry by product: [GET] `/orderproduct/product/{id}`

#### Orders
- Get orders by user: [GET] `/orders/{user_id}`
- Get orders by user and status: [GET] `/orders/{user_id}/{status}`
- Complete order: [POST] `/checkout/{order_id}`

#### Product
- Get all products: [GET] `/products`
- Get single product: [GET] `/products/{id}`
- Create product: [POST] `/products`
- Get product by category: [GET] `/products/category/{category_id}`

#### User
- Get all users: [GET] `/users`
- Get single user: [GET] `/users/{id}`
- Login user: [POST] `/users/login`
- Create user: [POST] `/users`
- Delete user: [DELETE] `/users/{id}`
- Delete all users: [DELETE] `/users`

<hr>

## Database schema with column name and type
#### categories
- id SERIAL
- name TEXT

#### users
- id SERIAL
- email TEXT
- username TEXT
- password TEXT

#### products
- id SERIAL
- name TEXT
- price REAL
- category_id INTEGER FOREIGN KEY REFERENCES categories(id)

#### orders
- id SERIAL
- user_id INTEGER FOREIGN KEY REFERENCES users(id)
- status TEXT

#### order_product
- id SERIAL
- order_id INTEGER FOREIGN KEY REFERENCES orders(id)
- product_id INTEGER FOREIGN KEY REFERENCES products(id)
- quantity INTEGER