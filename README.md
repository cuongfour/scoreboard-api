2. Create a diagram to illustrate the flow of execution.  
-> I have recorded the content in the file `scoreboard_flow_diagram.md`.  

3. Add additional comments for improvement you may have in the documentation.  
-> I have recorded the content in the file `scoreboard_api_spec_comments.md`.
**********---------**********

# Scoreboard API Service

## Overview
The Scoreboard API Service allows users to update their scores in a real-time scoreboard application. This service provides endpoints for authentication, updating scores, and retrieving top scores.

## Prerequisites
Ensure you have the following installed on your system:
- **Node.js** (>= 16.x)
- **npm** (>= 8.x) or **yarn**
- **PostgreSQL** (for database storage)
- **jq** (for formatting JSON responses in the terminal)
- **httpie** (optional, for cleaner API requests)

## Installation
Clone the repository and install the necessary dependencies:
```sh
git clone https://github.com/cuongfour/scoreboard-api.git
cd scoreboard-api
npm install  # or yarn install
```

## Environment Variables
Create a `.env` file in the project root with the following:
```
PORT=3000
JWT_SECRET=your_secret_key
DATABASE_URL=postgres://username:password@localhost:5432/crud_db
```

## Running the Server
Start the API server with:
```sh
npx ts-node src/server.ts;
```

## API Endpoints
### 1. **POST /api/login**
**Description**: Authenticates a user and returns a JWT token.

**Request Body:**
```json
{
  "username": "admin",
  "password": "password"
}
```
**Example Request:**
```sh
curl -X POST http://localhost:3000/api/login \
     -H "Content-Type: application/json" \
     -d '{"username": "admin", "password": "password"}' | jq
```

---

### 2. **POST /api/update**
**Description**: Updates the score for a user.

**Request Headers:**
```
Authorization: Bearer <your-jwt-token>
Content-Type: application/json
```
**Request Body:**
```json
{
  "userId": "1",
  "score": 100
}
```
**Example Request:**
```sh
curl -X POST http://localhost:3000/api/update \
     -H "Content-Type: application/json" \
     -H "Authorization: Bearer <your-jwt-token>" \
     -d '{"userId": "1", "score": 100}' | jq
```

---

### 3. **GET /api/top**
**Description**: Retrieves the top 10 highest scores.

**Example Request:**
```sh
curl -X GET http://localhost:3000/api/top | jq
```

## License
This project is licensed under the MIT License.
