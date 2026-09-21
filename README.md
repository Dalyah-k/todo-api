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

### Request Examples

### Register

```json
{
  "name": "Dalia",
  "email": "dalia@example.com",
  "password": "123456"
}
```

### Login

```json
{
  "email": "dalia@example.com",
  "password": "123456"
}
```

#### Login Response

```json
{
  "message": "Login successful",
  "token": "<your-jwt-token>",
  "user": {
    "id": "<user-id>",
    "name": "Dalia",
    "email": "dalia@example.com"
  }
}
```

### Create Task

**POST** `/api/tasks`

```json
{
  "title": "Learn API",
  "completed": false
}
```

#### Create Task Response

```json
{
  "_id": "<task-id>",
  "title": "Learn API",
  "completed": false,
  "user": {
    "_id": "<user-id>",
    "name": "Dalia",
    "email": "dalia@example.com"
  }
}
```

### Update Task

**PUT** `/api/tasks/:id`

```json id="m5d0xe"
{
  "title": "Updated",
  "completed": true
}
```

#### Update Task Response

```json
{
  "_id": "<task-id>",
  "title": "Updated",
  "completed": true,
  "user": {
    "_id": "<user-id>",
    "name": "Dalia",
    "email": "dalia@example.com"
  }
}
```

### Delete Task

**DELETE** `/api/tasks/:id`

#### Delete Task Response

```json id="z5kq3r"
{
  "message": "Task deleted successfully",
  "deletedTask": {
    "_id": "<task-id>",
    "title": "Updated",
    "completed": true,
    "user": "<user-id>"
  }
}
```

### Get All Tasks

**GET** `/api/tasks`

#### Get All Tasks Response

```json
{
  "message": "Tasks retrieved successfully",
  "tasks": [
    {
      "_id": "<task-id>",
      "title": "Learn API",
      "completed": false,
      "user": {
        "_id": "<user-id>",
        "name": "Dalia",
        "email": "dalia@example.com"
      }
    }
  ]
}
```

### Get Single Task

**GET** `/api/tasks/:id`

#### Get Single Task Response

```json id="9g5q2w"
{
  "message": "Task retrieved successfully",
  "task": {
    "_id": "<task-id>",
    "title": "Learn API",
    "completed": false,
    "user": {
      "_id": "<user-id>",
      "name": "Dalia",
      "email": "dalia@example.com"
    }
  }
}
```
