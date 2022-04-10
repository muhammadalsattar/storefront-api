# Storefront RESTful API with Postgres database.

### SQL queries to Setup and connect to the database:
- `CREATE USER reviewer WITH PASSWORD 'pass1234';` _create user reviewer_
- `CREATE DATABASE storefront_db;` _create storefront\_db database_
- `GRANT ALL PRIVILEGES ON DATABASE storefront_db TO reviewer;` _grant access to user reviewer on database storefront\_db_

<hr>

### Package installation command:
- `npm i` _install all packages and dependecies._

<hr>

### .env file:
- Create .env file in the root directory.
- Required environment variables
    - `DB_HOST="localhost"` _database host_
    - `DB_NAME="storefront_db"` _database name_
    - `DB_USER="reviewer"` _database user_
    - `DB_PASSWORD="pass1234"` _database password_
    - `DB_PORT="5432"` _database port_
    - `JWT_SECRET="secret"` _jwt secret key_
    - `PORT="3000"` _server port_

<hr>

###  Commands:
- `npm run build` _create a build directory_
- `npm run test` _run all test suites_
- `npm run migrate` _run all up migrations_
- `npm run start` _run down & up migrations and start the server_