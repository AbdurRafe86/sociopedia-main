🌐 Sociopedia — Client (React Frontend)

This is the frontend of Sociopedia, built with React, Redux Toolkit, and Material UI.
It communicates with the backend server to:

Register/login users
Display posts
Upload images
Add/remove friends
Like/unlike posts
View user profiles
🎨 UI Tech Stack
Frontend
React.js
React Router
Redux Toolkit
Redux Persist
Material UI
Formik + Yup (forms & validation)
📁 Folder Structure
client/
│── public/
│── src/
│   ├── components/     # Reusable UI components
│   ├── pages/          # Login, Home, Profile
│   ├── state/          # Redux store, slices
│   ├── theme.js        # MUI theming
│   ├── App.js
│   └── index.js
│── package.json
🔧 Installation & Setup
1️⃣ Install Dependencies

Inside the client folder:

npm install
▶️ 2️⃣ Run the App
npm start

The app will open at:

http://localhost:3000

Make sure your backend is running at:

http://localhost:6001
🔗 API Integration

API requests are made using:

fetch()
Base URL typically defined in a config file
All secure requests include JWT token
📌 Pages
🏠 Home Page
Displays global feed
Shows posts from all users
Create new post
Like/unlike posts
👤 Profile Page
User’s personal info
Their posts
Friend list
🔐 Login / Register
Form validation (Formik + Yup)
JWT-based login
Persistent user sessions
📦 Redux State Structure
state/
│── authSlice.js     # Handles user + token
│── postsSlice.js    # Stores all posts
│── store.js         # Configures Redux store

Uses Redux Persist to store user session in local storage.

🎨 Material UI Theme

Dark/Light mode supported:

primary colors
background colors
typography settings

Theme switch handled via Redux.

🖼️ Image Uploads

Frontend uploads images using:

FormData()

Then sends it to backend via:

POST /posts
📝 Notes
Requires Node v18
Make sure backend .env and MongoDB connection are correct
Works together with the backend
