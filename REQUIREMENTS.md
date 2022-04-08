# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index [GET] /products
- Show [GET] /products/:id
- Create [token required] [POST] /products
- [OPTIONAL] Top 5 most popular products 
- [OPTIONAL] Products by category (args: product category) [GET] /products/category/:categoryId

#### Users
- Index [token required] [GET] /users
- Show [token required] [GET] /users/:id
- Create N[token required] [POST] /users

#### Orders
- Current Order by user (args: user id)[token required] [GET] /orders/:userId
- [OPTIONAL] Completed Orders by user (args: user id)[token required] [GET] /orders/:userId/status/(completed| active)

## Tables schemas
#### Product
-  id serial primary key
- name text
- price real
- category foreign key references categories(id)

#### User
- id serial primary key
- firstName text
- lastName text
- username text
- password text

#### Orders
- id serial primary key
- user_id foreign key refereneces users(id)
- quantity integer
- product_id foreign key refereneces products(id)
- status text (active or completed)

#### Categories
- id serial primary key
- name text

