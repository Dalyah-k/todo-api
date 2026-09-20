# To Do List API

A RESTful API for managing tasks with user authentication and JWT protection.

## Technologies

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt
- Postman

## Installation

1. Clone the repository.

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the project root and add your MongoDB connection string and JWT secret.

4. Start the server:

```bash
node server.js
```

## API Endpoints

### Authentication

- POST `/api/auth/register` — Register a new user
- POST `/api/auth/login` — Login and receive a JWT token

### Tasks

- GET `/api/tasks` — Get all tasks for the authenticated user
- GET `/api/tasks/:id` — Get a single task
- POST `/api/tasks` — Create a new task
- PUT `/api/tasks/:id` — Update a task
- DELETE `/api/tasks/:id` — Delete a task

### JWT Authentication

All task endpoints require a valid JWT token.

Send the token in the request header:

```text
Authorization: Bearer <your-token>
```
