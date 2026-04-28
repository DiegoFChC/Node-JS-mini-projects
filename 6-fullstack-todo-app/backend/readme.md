# 📋 Node REST API - Tasks

An educational REST API built with Node.js using only native modules, without Express or external frameworks.

This project implements a complete CRUD system for managing tasks, including pagination, state management, and file-based persistence, all built manually to understand how backend systems work internally.

The main objective is learning, not production usage.

This version focuses on:

* How to structure a backend without frameworks
* Manual routing and request handling
* Controller-Service architecture
* File-based persistence (JSON)
* Pagination using query parameters
* Clean separation of concerns

## ✅ Features

### 🧩 Core API

* CRUD operations for tasks
* Pagination with query params (`page`, `limit`)
* Dynamic routes (`/task/:id`)
* Toggle task state (active / completed)
* File-based persistence using JSON
* Separation of controllers and services

### 🧠 Architecture

* Layered structure:
  * Routes → Controllers → Services → Data
* Controllers handle HTTP logic
* Services handle business logic and persistence
* Middlewares for request parsing

---

## 📁 Project Structure

```bash
/
│ index.js                        # Entry point, starts the HTTP server
│
├── routes/
│   └── tasks.routes.js          # Task routes (routing logic)
│
├── controllers/
│   └── tasks.controller.js      # HTTP handlers (req, res)
│
├── services/
│   └── tasks.service.js         # Business logic + file persistence
│
├── middlewares/
│   └── bodyParser.js            # Parses JSON request body
│
├── data/
│   └── tasks.json               # Tasks storage (file-based DB)
```

## 🔀 API Endpoints

| Method | Endpoint               | Description                          |
| ------ | ---------------------- | ------------------------------------ |
| GET    | `/task`                | Get all tasks                        |
| GET    | `/task?page=2&limit=5` | Get tasks with pagination            |
| GET    | `/task/:id`            | Get task by ID                       |
| POST   | `/task`                | Create new task                      |
| POST   | `/task/toggle/:id`     | Toggle task state (active/completed) |
| PATCH  | `/task/:id`            | Update task                          |
| DELETE | `/task/:id`            | Delete task                          |

🧠 Data Model

Example task:

```json
{
  "id": "uuid",
  "title": "Buy groceries",
  "description": "Milk, eggs, bread",
  "isActive": true
}
```

## ▶️ How to Run

Start the server:

```bash
npm run dev
```

The API will be available at:

```bash
http://localhost:3001
```

## 🚧 Notes
* This project is educational, not production-ready
* File-based storage is used intentionally
* No external dependencies are used
* Routing and middleware system are built manually

## 📜 License

MIT License — Free to use, modify, and learn from.