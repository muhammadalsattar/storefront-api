# Storefront RESTful API with Postgres database.

### Setup and connect to database:
- Create new user: `CREATE USER reviewer WITH PASSWORD 'pass1234';`
- Create database `CREATE DATABASE storefront_db;`
- Give access to new user `GRANT ALL PRIVILEGES ON DATABASE storefront_db TO reviewer`;

<hr>

### Package installation instructions:
- Run `npm i` to install all packages and dependecies.

<hr>

### .env file:
- Database connection variables:
    - `DB_HOST="localhost"`
    - `DB_NAME="storefront_db"`
    - `DB_USER="reviewer"`
    - `DB_PASSWORD="pass1234"`
    - `DB_PORT="5432"`
- Database migrations (node-pg-migrate) variables:    
    - `DATABASE_URL="postgres://reviewer:pass1234@localhost:5432/storefront_db"`
- Json web token secret key:    
    - `JWT_SECRET="secret"`
- Server port:
    - `PORT="3000"`

<hr>

###  Scripts:
- Run `npm run build` to create build directory.
- Run `npm run test` to run all test suites.
- Run `npm run migrate` to run all migrations.
- Run `npm run start` to run migrations and start the server.