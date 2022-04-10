# Storefront RESTful API with Postgres database.

### SQL queries to Setup and connect to the database:
- `CREATE USER reviewer WITH PASSWORD 'pass1234';` <!-- create user reviewer -->
- `CREATE DATABASE storefront_db;` <!-- create storefront_db database -->
- `GRANT ALL PRIVILEGES ON DATABASE storefront_db TO reviewer;` <!-- grant access to user reviewer on database storefront_db -->

<hr>

### Package installation instructions:
- Run `npm i` to install all packages and dependecies.

<hr>

### .env file:
- Create .env file in the root directory.
- Required environment variables
    - `DB_HOST="localhost"` <!-- database host -->
    - `DB_NAME="storefront_db"` <!-- database name -->
    - `DB_USER="reviewer"` <!-- database user -->
    - `DB_PASSWORD="pass1234"` <!-- database password -->
    - `DB_PORT="5432"` <!-- database port -->
    - `JWT_SECRET="secret"` <!-- jwt secret key -->
    - `PORT="3000"` <!-- server port -->

<hr>

###  Commands:
- `npm run build` <!-- create a build directory -->
- `npm run test` <!-- run all test suites -->
- `npm run migrate` <!-- run all up migrations -->
- `npm run start` <!-- run dwon & up migrations and start the server -->