# Storefront RESTful API with Postgres database.

<hr>

### Setup and connect to database:
1. Install Potgres locally on your machine
2. Create database with any name
3. Create .env file in the root directory

<hr>

### Required environment variables for the '.env' file:
- DB_HOST="your-database-host"
- DB_NAME="your-database-name"
- DB_USER="your-database-user"
- DB_PASSWORD="your-database-password"
- DB_PORT="your-database-port"
- DB_TEST="your-test-database-name"
- DATABASE_URL="postgres://your-database-user:your-database-password@your-database-host:your-database-port/your-database-name"
- JWT_SECRET="your-json-web-token-secret-key"

<hr>

###  Scripts:
- Run `npm i` to install all packages and dependecies.
- Run `npm run build` to create build directory.
- Run `npm run test` to run all test suites.
- Run `npm run migrate` to run all migrations.
- Run `npm run start` to run migrations and start the server.