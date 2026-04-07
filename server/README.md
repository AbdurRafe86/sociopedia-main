🚀 Sociopedia — Server (Backend API)

The Sociopedia Server is a RESTful API built using Node.js, Express.js, and MongoDB.
It handles:

User authentication (JWT)
Register/Login
Posts & Likes
Friend system
Image uploads
Secure password hashing
Database operations with Mongoose

This backend powers a full-stack MERN social media platform.

📚 Tech Stack
Backend
Node.js (v18 recommended)
Express.js
Database
MongoDB Atlas
Mongoose ODM
Authentication & Security
JWT (JSON Web Tokens)
bcrypt (password hashing)
dotenv
Other Tools
Multer (image uploads)
nodemon (dev server)
cors (cross-origin support)
📁 Folder Structure
server/
│── controllers/       # Business logic (auth, users, posts)
│── middleware/        # JWT authentication middleware
│── models/            # MongoDB/Mongoose schemas
│── routes/            # API endpoints
│── public/assets/     # Uploaded images
│── index.js           # Main server file
│── package.json
│── .env               # Environment variables
🔧 Installation & Setup
1️⃣ Install Dependencies

Run inside the server folder:

npm install
🔐 2️⃣ Environment Variables

Create a .env file inside the server folder:

MONGO_URL=your_mongodb_connection_string
JWT_SECRET=any_secret_key_here
PORT=6001
Example MongoDB URL
mongodb+srv://admin:password@cluster0.xxxxxx.mongodb.net/sociopedia
🗄️ 3️⃣ Connect to MongoDB Atlas

Steps:

Go to https://www.mongodb.com/atlas
Create a FREE cluster (M0)
Add a database user
Allow IP access from anywhere (0.0.0.0/0)
Copy your connection string
Paste it into .env
▶️ 4️⃣ Run the Server
npm start

If successful, it will display:

MongoDB connected
Server running on port 6001
🔗 API Endpoints
Auth Routes
Method	Endpoint	Description
POST	/auth/register	Create a new user
POST	/auth/login	Login & get JWT token
User Routes
Method	Endpoint	Description
GET	/users/:id	Get user profile
GET	/users/:id/friends	Get all friends of a user
PATCH	/users/:id/:friendId	Add/remove friend
Post Routes
Method	Endpoint	Description
GET	/posts	Get global feed
GET	/posts/:userId/posts	Get posts by a user
POST	/posts	Create a post
PATCH	/posts/:id/like	Like/unlike post
📦 Request/Response Examples
POST /auth/register
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@gmail.com",
  "password": "123456"
}
🖼️ Image Uploads

The backend uses Multer.
Images upload to:

server/public/assets/

Frontend sends images as FormData.

🔐 JWT Authentication

Add this in request headers when accessing protected routes:

Authorization: Bearer <your_token>
📝 Notes
Requires Node v18 (Node 20+ can break MongoDB driver)
Make sure .env is correctly configured
If using Windows, recommended to install Node using NVM
