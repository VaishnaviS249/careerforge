# CareerForge – Job Aggregator Web Application

CareerForge is a full-stack job aggregation platform that enables users to discover job opportunities, search and filter listings, save jobs for later, manage profiles, and apply for jobs through a centralized platform.

## Tech Stack

- Frontend: React.js, Tailwind CSS
- Backend: Node.js, Express.js
- Database: MongoDB Atlas, Mongoose
- Authentication: JWT, bcryptjs
- Web Scraping: Axios, Cheerio, Puppeteer
- Deployment: Vercel (Frontend), Render (Backend)

## Features

- User Registration and Login
- JWT-Based Authentication
- User Profile Management
- Save and Remove Jobs
- Job Search and Filtering
- Pagination Support
- RESTful APIs
- MongoDB Integration
- Job Aggregation and Scraping

## Prerequisites

- Node.js v18 or above
- Git
- MongoDB Atlas Account

## Installation

### Clone Repository

```bash
git clone https://github.com/<username>/CareerForge.git
cd CareerForge
```

### Install Backend Dependencies

```bash
cd backend
npm install
```

### Install Frontend Dependencies

```bash
cd ../frontend
npm install
```

## Environment Variables

Create a `.env` file inside the backend folder.

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=60d
```

## Run Backend

```bash
cd backend
npm start
```

Backend Server:

```text
http://localhost:5000
```

## Run Frontend

```bash
cd frontend
npm run dev
```

Frontend Application:

```text
http://localhost:5173
```

## API Endpoints

### Authentication

```http
POST /api/auth/signup
POST /api/auth/login
```

### User Management

```http
GET    /api/users/profile
PUT    /api/users/profile

GET    /api/users/saved-jobs
POST   /api/users/saved-jobs/:jobId
DELETE /api/users/saved-jobs/:jobId
```

### Job Management

```http
GET    /api/jobs
GET    /api/jobs/:id
POST   /api/jobs
PUT    /api/jobs/:id
DELETE /api/jobs/:id
```

### Pagination

```http
GET /api/jobs?page=1&limit=10
```

### Filtering

```http
GET /api/jobs?location=Bangalore
GET /api/jobs?jobType=Internship
GET /api/jobs?company=Google
GET /api/jobs?search=frontend
```

## Project Structure

```text
CareerForge/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
└── README.md
```

## Dependencies

### Backend

- express
- mongoose
- jsonwebtoken
- bcryptjs
- dotenv
- cors
- nodemon

### Frontend

- react
- react-router-dom
- axios
- tailwindcss

### Scraping

- axios
- cheerio
- puppeteer
- node-cron

## Deployment

- Frontend: Vercel
- Backend: Render
- Database: MongoDB Atlas

## License

This project is developed for educational and learning purposes.
