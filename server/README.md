# 🚀 Sociopedia — Server (Backend API)

The **Sociopedia Server** is a RESTful API built with **Node.js**, **Express.js**, and **MongoDB**. It powers the backend of a full-stack MERN social media platform.

---

## 🌟 Features

* 🔐 JWT-based authentication
* 📝 User registration & login
* ❤️ Posts & like/unlike functionality
* 👥 Friend system (add/remove friends)
* 🖼️ Image uploads using Multer
* 🔒 Secure password hashing with bcrypt
* 🗄️ MongoDB database operations via Mongoose

---

## 📚 Tech Stack

### 🖥️ Backend

* Node.js (v18 recommended)
* Express.js

### 🗄️ Database

* MongoDB Atlas
* Mongoose ODM

### 🔐 Authentication & Security

* JWT (JSON Web Tokens)
* bcrypt
* dotenv

### 🛠️ Other Tools

* Multer (image uploads)
* nodemon (development server)
* cors (cross-origin requests)

---

## 📁 Folder Structure

```id="svrstr1"
server/
│── controllers/       # Business logic (auth, users, posts)
│── middleware/        # JWT authentication middleware
│── models/            # MongoDB schemas
│── routes/            # API routes
│── public/assets/     # Uploaded images
│── index.js           # Entry point
│── package.json
│── .env               # Environment variables
```

---

## ⚙️ Installation & Setup

### 1️⃣ Install Dependencies

Run inside the **server** folder:

```bash id="svrinst1"
npm install
```

---

### 🔐 2️⃣ Environment Variables

Create a `.env` file inside the server directory:

```env id="svrenv1"
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=6001
```

---

### 📌 Example MongoDB URL

```id="svrurl1"
mongodb+srv://admin:password@cluster0.xxxxxx.mongodb.net/sociopedia
```

---

## 🗄️ 3️⃣ Connect to MongoDB Atlas

Follow these steps:

1. Go to https://www.mongodb.com/atlas
2. Create a **FREE cluster (M0)**
3. Add a database user
4. Allow IP access: `0.0.0.0/0`
5. Copy the connection string
6. Paste it into your `.env` file

---

## ▶️ 4️⃣ Run the Server

```bash id="svrrun1"
npm start
```

If successful, you should see:

```id="svrlog1"
MongoDB connected  
Server running on port 6001
```

---

## 🔗 API Endpoints

### 🔐 Auth Routes

| Method | Endpoint       | Description           |
| ------ | -------------- | --------------------- |
| POST   | /auth/register | Register a new user   |
| POST   | /auth/login    | Login and receive JWT |

---

### 👤 User Routes

| Method | Endpoint             | Description            |
| ------ | -------------------- | ---------------------- |
| GET    | /users/:id           | Get user profile       |
| GET    | /users/:id/friends   | Get user’s friends     |
| PATCH  | /users/:id/:friendId | Add or remove a friend |

---

### 📝 Post Routes

| Method | Endpoint             | Description           |
| ------ | -------------------- | --------------------- |
| GET    | /posts               | Get global feed       |
| GET    | /posts/:userId/posts | Get user posts        |
| POST   | /posts               | Create a post         |
| PATCH  | /posts/:id/like      | Like or unlike a post |

---

## 📦 Request Example

### POST `/auth/register`

```json id="svrreq1"
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@gmail.com",
  "password": "123456"
}
```

---

## 🖼️ Image Uploads

* Uses **Multer** for handling file uploads
* Images are stored in:

```id="svrimg1"
server/public/assets/
```

* Frontend sends images using `FormData`

---

## 🔐 JWT Authentication

For protected routes, include the token in headers:

```id="svrjwt1"
Authorization: Bearer <your_token>
```

---

## 📝 Notes

* Requires **Node.js v18** (Node 20+ may cause MongoDB driver issues)
* Ensure `.env` is properly configured
* MongoDB Atlas connection must be active
* Recommended to use **NVM** for managing Node versions (especially on Windows)

---

## 📌 Summary

The Sociopedia Server is a robust backend API that manages authentication, user interactions, posts, and media uploads, forming the core of the Sociopedia MERN application.

---

