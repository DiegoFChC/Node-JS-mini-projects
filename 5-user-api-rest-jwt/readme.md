# 🔐 Node REST API with Authentication

An educational REST API built with Node.js using only native modules, without Express or external frameworks.

This project extends a basic REST API into a fully authenticated system, implementing JWT, refresh tokens, cookies, role-based access control, and security mechanisms, all built manually to deeply understand how authentication works under the hood.

The main objective is learning, not production usage.

This version focuses on:

* How authentication systems work internally
* JWT creation, verification, and payload trust
* Refresh token rotation and reuse detection
* Cookie-based authentication
* Custom middleware pipelines
* Access control (roles & ownership)
* Logout and token revocation strategies

## ✅ Features

### 🧩 Core API

* CRUD operations for users
* Pagination with query params (page, limit)
* Dynamic routes (/users/:id)
* PUT vs PATCH behavior
* File-based persistence using JSON
* Centralized response helpers

### 🔐 Authentication & Security

* User registration and login
* Password hashing (crypto)
* JWT access tokens
* Refresh tokens with:
  * Hashing
  * Expiration
  * Rotation
  * Reuse detection
* HttpOnly cookies for refresh tokens
* Logout (single session)
* Logout from all devices
* Token revocation (blacklist-style)
* Role-based authorization (admin, user)
* Ownership validation (user can only access own data)

### 🧠 Middleware System

* Custom middleware pipeline (Express-like)
* Async middleware support
* Request parsing and validation
* Authentication & authorization layers

## 📁 Project Structure

```bash
/
│ index.js                          # Entry point, starts the HTTP server
│
├── server/
│   ├── server.js                   # Create the HTTP server
│   └── router.js                   # Main request router
│
├── routes/
│   ├── users.routes.js             # User CRUD handlers
│   └── auth.routes.js              # Auth handlers (register, login, refresh, logout)
│
├── core/
│   ├── user.service.js             # User business logic
│   ├── auth.service.js             # Login / register logic
│   ├── blackList.service.js        # Access tokens blackList, presistence & rules
│   ├── refreshTokens.service.js    # Refresh token persistence & rules
│   └── storage.service.js          # File-based storage abstraction
│
├── middlewares/
│   ├── urlParser.js                # Parses URL, query params, path params
│   ├── bodyParser.js               # Parses JSON request body
│   ├── cookieParser.js             # Parses cookies from headers
│   ├── authMiddleware.js           # JWT validation & blacklist check
│   ├── roleMiddleware.js           # Role-based access control
│   ├── ownershipMiddleware.js      # Resource ownership validation
│   └── validUUID.js                # UUID validation
│
├── utils/
│   ├── jwt.js                      # JWT creation & verification
│   ├── refreshToken.js             # Refresh token generation & hashing
│   ├── hashPassword.js             # Password hashing utilities
│   └── sendResponse.js             # Standardized HTTP responses
│
├── data/
│   ├── users.json                  # Users data
│   ├── jwtBlackList.json           # Acces tokens blackList
│   └── refreshTokens.json          # Refresh tokens storage
│
└── constants/
    └── index.js                    # Paths and config constants

```

## 🔀 API Endpoints

### 🔑 Auth
| Method | Endpoint           | Description                       |
| ------ | ------------------ | --------------------------------- |
| POST   | `/auth/register`   | Register a new user               |
| POST   | `/auth/login`      | Login and receive access token    |
| POST   | `/auth/refresh`    | Refresh access token (via cookie) |
| POST   | `/auth/logout`     | Logout current session            |
| POST   | `/auth/logout/all` | Logout from all devices           |

### 👤 Users

| Method | Endpoint                     | Description                     | Access         |
| ------ | ---------------------------- | ------------------------------- | -------------- |
| GET    | `/users/me`                  | Get my user info                | Owner          |
| GET    | `/users`                     | Get all users                   | Admin only     |
| GET    | `/users?page=2&limit=5`      | Get all users (with pagination) | Admin only     |
| GET    | `/users/:id`                 | Get user by ID                  | Admin only     |
| POST   | `/users`                     | Create new user                 | All            |
| PUT    | `/users/:id`                 | Replace user (full update)      | Owner          |
| PATCH  | `/users/:id`                 | Partial update                  | Owner          |
| DELETE | `/users/:id`                 | Delete user                     | Admin only     |

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
