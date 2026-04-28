# 🎨 TODO App Frontend (Vanilla JS)

A frontend application built with HTML, CSS, and Vanilla JavaScript that consumes a custom Node.js REST API.

This project focuses on building a complete interactive UI without frameworks, implementing state management, pagination, modular architecture, and dynamic DOM manipulation.

The main objective is learning how modern frontend applications work under the hood.

## ✅ Features

### 🧩 Core Functionality

* Display tasks from backend API
* Create new tasks (modal form)
* Edit existing tasks
* Delete tasks
* Toggle task state (active / completed)
* Pagination with query params (page, limit)

### 🧠 Frontend Architecture

* Modular JavaScript using ES Modules
* Separation of concerns:
  * API layer
  * UI rendering
  * State management
  * Routing (URL sync)
* Dynamic DOM rendering (no frameworks)
* Event-driven architecture

### 🔄 State & Navigation

* Global state management (state.js)
* Pagination state (currentPage, totalPages)
* URL synchronization using URLSearchParams
* Browser navigation support (popstate)

### 🎨 UI / UX

* Modal system (create & edit tasks)
* Loading states
* Pagination controls (prev / next + dynamic buttons)
* Task status indicators (active / completed)
* Action buttons (edit, delete, toggle)

## 📁 Project Structure

/src
│
├── api.js            # Handles all HTTP requests
├── state.js          # Global state management
├── ui.js             # DOM rendering (tasks, pagination, modals)
├── router.js         # URL synchronization (query params)
├── store.js          # Local storage helpers
└── main.js           # App entry point (controller/orchestrator)

## 🔗 API Integration

The frontend consumes the backend API:

```bash
http://localhost:3001/task?page=1&limit=5
```

Expected response:

```json
{
  "total": 37,
  "page": 1,
  "totalPages": 4,
  "limit": 10,
  "data": [...],
}
```

## ▶️ How to Run

1. Make sure the backend is running.
2. Open the frontend:

```bash
abrir index.html
```

## 🧠 What You Learn

This project demonstrates:

* How to build a frontend without frameworks
* Manual state management
* API consumption with fetch
* Pagination (frontend + backend integration)
* Modular architecture in JavaScript
* DOM manipulation patterns

## 🚧 Notes
* This project is educational, not production-ready
* No frameworks or libraries are used
* Focus is on understanding core frontend concepts

## 📜 License

MIT License — Free to use, modify, and learn from.