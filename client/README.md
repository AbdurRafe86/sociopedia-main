📁 Client — Sociopedia Frontend

This is the frontend for the Sociopedia MERN social media application.
Users can register, login, view profiles, create posts, like posts, and manage friends.

🚀 Tech Stack
React.js
Redux Toolkit
React Router
Material UI
Formik + Yup
Redux Persist
📦 Install Dependencies

Open a terminal inside the client folder:

npm install
▶️ Run the React App
npm start

Runs on:

http://localhost:3000
🔗 Connects to Backend (Server)

The client communicates with the API server running at:

http://localhost:6001

You may update this inside:

src/api/index.js or wherever the base URL is configured.

📁 Folder Structure
client/
│── public/
│── src/
│   ├── components/
│   ├── pages/
│   ├── state/
│   ├── theme.js
│   ├── main.jsx / index.js
│── package.json
🎨 Features
Dark/Light mode
User profile pages
Upload images
Like posts
Add/remove friends
Responsive UI
Persisted login
Global state with Redux
