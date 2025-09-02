# AWS Lambda REST API Project

This project contains sample AWS Lambda functions for a REST API with MySQL integration. It includes CRUD endpoints and basic API Gateway configuration.

## Features

- Node.js Lambda functions
- REST API endpoints (CRUD)
- MySQL database integration
- API Gateway configuration

## Setup

1. Install dependencies:
   ```sh
   npm install
   ```
2. Configure MySQL connection in `.env`:
   ```env
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=yourpassword
   DB_DATABASE=testdb
   ```
3. Create database tables:
   ```sh
   node src/db/createTables.js
   ```
4. Test database connection:
   ```sh
   node src/db/testDbConnection.js
   ```

## Local Testing

Test Lambda functions directly:

1. Use test scripts in the `tests/` folder:
   ```sh
   node tests/testCreateUser.js
   node tests/testGetUser.js
   node tests/testUpdateUser.js
   node tests/testDeleteUser.js
   node tests/testCreateOrder.js
   node tests/testGetOrder.js
   node tests/testUpdateOrder.js
   node tests/testDeleteOrder.js
   ```

## API Usage

After deploying (locally or to AWS), use Postman or curl to interact with endpoints:

- **Create User:**
  ```sh
  curl -X POST http://localhost:3000/users -H "Content-Type: application/json" -d '{"name":"John Doe","email":"john@example.com","age":30,"address":"123 Main St","phone":"1234567890"}'
  ```
- **Get User:**
  ```sh
  curl http://localhost:3000/users/1
  ```
- **Update User:**
  ```sh
  curl -X PUT http://localhost:3000/users/1 -H "Content-Type: application/json" -d '{"name":"Jane Doe","email":"jane@example.com","age":28,"address":"456 Main St","phone":"9876543210"}'
  ```
- **Delete User:**
  ```sh
  curl -X DELETE http://localhost:3000/users/1
  ```
- **Create Order:**
  ```sh
  curl -X POST http://localhost:3000/orders -H "Content-Type: application/json" -d '{"user_id":1,"product":"Book","amount":19.99}'
  ```
- **Get Order:**
  ```sh
  curl http://localhost:3000/orders/1
  ```
- **Update Order:**
  ```sh
  curl -X PUT http://localhost:3000/orders/1 -H "Content-Type: application/json" -d '{"product":"Pen","amount":9.99}'
  ```
- **Delete Order:**
  ```sh
  curl -X DELETE http://localhost:3000/orders/1
  ```

## Deployment

Deploy using AWS SAM or Serverless Framework:

- **AWS SAM:**
  ```sh
  sam build
  sam deploy --guided
  ```
- **Serverless Framework:**
  ```sh
  serverless deploy
  ```

## Folder Structure

- `src/` - Lambda function code
- `config/` - Database configuration
- `tests/` - Test scripts and events
- `.github/` - Copilot instructions

## Notes

- Update `.env` with your database credentials.
- Use `.gitignore` to exclude sensitive and build files from version control.
- See test scripts in `tests/` for sample payloads and usage.
