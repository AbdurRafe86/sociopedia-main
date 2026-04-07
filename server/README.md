📁 Server — Sociopedia API

This is the backend for the Sociopedia MERN social media application.
It handles authentication, user management, posts, likes, and file uploads.

🚀 Tech Stack
Node.js (v18)
Express.js
MongoDB Atlas
Mongoose
Multer (image uploads)
JWT Authentication
dotenv
📦 Install Dependencies

Open terminal inside the server folder:

npm install
🔐 Environment Variables

Create a .env file inside the server folder:

MONGO_URL=your_mongodb_connection_string
PORT=6001
JWT_SECRET=your_secret_key
Example MongoDB URL:
mongodb+srv://admin:password@cluster0.xxxxx.mongodb.net/sociopedia
▶️ Run the Server
npm start

If successful, you should see:

Server listening on port 6001
MongoDB connected
📌 API Routes
Auth
POST /auth/register
POST /auth/login
Users
GET /users/:id
GET /users/:id/friends
PATCH /users/:id/:friendId
Posts
GET /posts
GET /posts/:userId/posts
POST /posts
PATCH /posts/:id/like
📁 Folder Structure
server/
│── controllers/
│── middleware/
│── models/
│── routes/
│── uploads/
│── index.js
│── package.json
