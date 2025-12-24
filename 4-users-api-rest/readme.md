# 🧩 Node REST API

A simple REST API built with Node.js using only native modules (http, fs, url, etc.), without Express or any external framework.

The main goal of this project is to understand how a web server works internally, including routing, request parsing, middleware pipelines, and CRUD operations.

This version focuses on:

* Building a REST API from scratch
* Understanding HTTP methods and status codes
* Designing controllers, storage layers, and middlewares
* Handling JSON bodies, query params, and dynamic routes

✅ Features

* CRUD operations for users
* Pagination with query params (page, limit)
* Dynamic routes (/users/:id)
* PUT vs PATCH behavior
* Custom middleware system
* File-based persistence using JSON
* Centralized response helpers

Perfect for learning how to create a basic server with Node.js

## 📁 Project Structure

```bash
/
│ index.js                          # Entry point, creates and starts the HTTP server
│
├── router/
│   └── router.js                   # Main request router
│
├── routes/
│   └── users.routes.js             # User-related controllers (handlers)
│
├── core/
│   └── userStorage.js              # Data access layer (read/write users.json)
│
├── middlewares/
│   ├── urlParser.js                # Parses URL, query params, headers
│   ├── bodyParser.js               # Parses JSON request body
│   └── validUUID.js                # Validates UUID params
│
├── utils/
│   ├── sendResponse.js             # Standardized HTTP responses
│   └── utils.js                    # Utility helpers (UUID validation, field filtering)
│
└── data/
    └── users.json                  # File-based data storage
```

## 🔀 API Endpoints

| Method | Endpoint     | Description                     |
| ------ | ------------ | ------------------------------- |
| GET    | `/users`     | Get all users (with pagination) |
| GET    | `/users/:id` | Get user by ID                  |
| POST   | `/users`     | Create new user                 |
| PUT    | `/users/:id` | Replace user (full update)      |
| PATCH  | `/users/:id` | Partial update                  |
| DELETE | `/users/:id` | Delete user                     |

## 📦 Request Body (POST / PUT / PATCH)

```json
{
  "name": "John",
  "lastname": "Doe",
  "email": "john@example.com"
}
```

* POST and PUT require all fields
* PATCH allows partial updates

## ▶️ How to Run

Just start the project normally:

```bash
npm run dev
```

## 🚧 Notes

* This project is educational, not production-ready
* File-based storage is used intentionally to keep the focus on server logic
* No external dependencies are used

## 📜 License

MIT License — Free to use, modify, and learn from.
