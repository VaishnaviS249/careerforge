# Job Aggregator — Backend API

A RESTful backend for a Job Aggregator Web Application built with **Node.js**, **Express.js**, **MongoDB**, **Mongoose**, **JWT Authentication**, and **bcrypt**.

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env` and fill in your values:
```bash
cp .env.example .env
```

| Variable        | Description                        | Default                                      |
|-----------------|------------------------------------|----------------------------------------------|
| `PORT`          | Port the server runs on            | `5000`                                       |
| `MONGO_URI`     | MongoDB connection string          | `mongodb://localhost:27017/job-aggregator`   |
| `JWT_SECRET`    | Secret key for signing JWT tokens  | *(change this!)*                             |
| `JWT_EXPIRES_IN`| Token expiry duration              | `7d`                                         |

### 3. Start the Server
```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

---

## 📁 Project Structure

```
backend/
├── config/
│   └── db.js               # MongoDB connection
├── controllers/
│   ├── authController.js   # Signup & Login logic
│   ├── userController.js   # Profile & Saved Jobs logic
│   └── jobController.js    # Job CRUD logic
├── middleware/
│   └── authMiddleware.js   # JWT protect middleware
├── models/
│   ├── User.js             # User schema & password hashing
│   └── Job.js              # Job schema
├── routes/
│   ├── authRoutes.js       # /api/auth
│   ├── userRoutes.js       # /api/users
│   └── jobRoutes.js        # /api/jobs
├── .env                    # Environment variables (git-ignored)
├── .env.example            # Example env file
├── server.js               # App entry point
└── package.json
```

---

## 🔐 Authentication

JWT tokens are passed in the `Authorization` header:
```
Authorization: Bearer <token>
```

---

## 📡 API Reference

### Auth Routes — `/api/auth`

| Method | Endpoint         | Access | Description        |
|--------|------------------|--------|--------------------|
| POST   | `/api/auth/signup` | Public | Register new user |
| POST   | `/api/auth/login`  | Public | Login user        |

**Signup — POST /api/auth/signup**
```json
// Request Body
{ "name": "Jane Doe", "email": "jane@example.com", "password": "secret123" }

// Response 201
{ "success": true, "token": "<jwt>", "user": { "id": "...", "name": "Jane Doe", "email": "jane@example.com" } }
```

**Login — POST /api/auth/login**
```json
// Request Body
{ "email": "jane@example.com", "password": "secret123" }

// Response 200
{ "success": true, "token": "<jwt>", "user": { "id": "...", "name": "Jane Doe", "email": "jane@example.com" } }
```

---

### User Routes — `/api/users` *(All Protected)*

| Method | Endpoint                        | Description              |
|--------|---------------------------------|--------------------------|
| GET    | `/api/users/profile`            | Get logged-in user profile |
| PUT    | `/api/users/profile`            | Update user profile      |
| GET    | `/api/users/saved-jobs`         | Get all saved jobs       |
| POST   | `/api/users/saved-jobs/:jobId`  | Save a job               |
| DELETE | `/api/users/saved-jobs/:jobId`  | Remove a saved job       |

---

### Job Routes — `/api/jobs`

| Method | Endpoint       | Access    | Description           |
|--------|----------------|-----------|-----------------------|
| GET    | `/api/jobs`    | Public    | List jobs (paginated) |
| POST   | `/api/jobs`    | Private   | Create a job          |
| GET    | `/api/jobs/:id`| Public    | Get single job        |
| PUT    | `/api/jobs/:id`| Private   | Update a job          |
| DELETE | `/api/jobs/:id`| Private   | Delete a job          |

**Pagination & Filtering**

```
GET /api/jobs?page=1&limit=10
GET /api/jobs?location=Bangalore&jobType=Internship
GET /api/jobs?company=Google&page=2&limit=5
GET /api/jobs?search=frontend developer
```

| Query Param | Type   | Description                                       |
|-------------|--------|---------------------------------------------------|
| `page`      | number | Page number (default: 1)                          |
| `limit`     | number | Results per page (default: 10, max: 100)          |
| `location`  | string | Filter by location (case-insensitive, partial)    |
| `jobType`   | string | Filter by job type (e.g., Full-time, Internship)  |
| `company`   | string | Filter by company name (case-insensitive, partial)|
| `search`    | string | Full-text search on title, description, company   |

**Paginated Response**
```json
{
  "success": true,
  "pagination": {
    "currentPage": 1,
    "totalPages": 5,
    "totalJobs": 48,
    "limit": 10,
    "hasNextPage": true,
    "hasPrevPage": false
  },
  "jobs": [ ... ]
}
```

---

## 🧩 MongoDB Models

### User
| Field      | Type              | Notes                         |
|------------|-------------------|-------------------------------|
| name       | String            | Required, 2–50 chars          |
| email      | String            | Required, unique              |
| password   | String            | Hashed with bcrypt, hidden    |
| savedJobs  | [ObjectId → Job]  | Array of saved job references |

### Job
| Field       | Type   | Notes                                                     |
|-------------|--------|-----------------------------------------------------------|
| title       | String | Required                                                  |
| company     | String | Required                                                  |
| location    | String | Required                                                  |
| jobType     | String | Required, enum: Full-time, Part-time, Internship, etc.   |
| description | String | Required                                                  |
| source      | String | Optional, defaults to "Manual"                           |
| applyLink   | String | Required                                                  |
| createdAt   | Date   | Auto-generated                                            |
