# 🌐 Sociopedia — Full Stack Social Media App

[![My Skills](https://skillicons.dev/icons?i=react,redux,materialui,nodejs,express,mongodb,vercel,framer,tailwind)](https://skillicons.dev)

Sociopedia is a premium, full-featured social media platform built with the **MERN** stack. It offers a sophisticated user experience with dark/light mode, real-time post interactions, and secure image-based registration.

---

## ✨ Features

- **🔐 Secure Authentication**: JWT-based login and registration with encrypted passwords.
- **🎨 Premium UI/UX**: Modern design system using **Inter** typography, sophisticated color palettes, and smooth 60fps transitions.
- **🖼️ Media Rich Posts**: Create posts with image uploads, descriptions, and location tagging.
- **👥 Social Connectivity**: Add or remove friends, view user profiles, and see real-time impressions/profile views.
- **🌓 Dynamic Themes**: Seamless switching between Dark and Light modes with persistent user preferences.
- **🚀 Performance Optimized**: Built-in rate limiting, helmet security, and optimized MongoDB queries.

---

## 🛠️ Tech Stack

### Frontend
- **React 18** (App Architecture)
- **Material UI v5** (Component Library)
- **Redux Toolkit** & **Redux Persist** (State Management)
- **Formik** & **Yup** (Form Handling & Validation)
- **Framer Motion** (Smooth Animations)

### Backend
- **Node.js** & **Express** (API Server)
- **MongoDB** & **Mongoose** (Database & ODM)
- **Multer** (File Upload Management)
- **JWT** (Security & Auth)
- **Express Rate Limit** (DDoS Protection)

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB Atlas Account

### 1️⃣ Clone and Install
```bash
git clone https://github.com/AbdurRafe86/sociopedia-main.git
cd sociopedia-main

# Install Server Dependencies
cd server
npm install

# Install Client Dependencies
cd ../client
npm install
```

### 2️⃣ Environment Configuration
Create a `.env` file in the **server** directory:
```env
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_super_secret_key
PORT=6001
```

### 3️⃣ Run the Application

**Start Backend:**
```bash
cd server
npm start
```

**Start Frontend:**
```bash
cd client
npm start
```

The app will be available at `http://localhost:3000`.

---

## 📁 Project Structure

```text
sociopedia-main/
├── client/              # React frontend
│   ├── public/          # Static assets
│   └── src/             # Source code (scenes, state, theme)
├── server/              # Express backend
│   ├── controllers/     # API logic
│   ├── middleware/      # Auth & Security
│   ├── models/          # Data schemas
│   └── public/assets/   # Uploaded images
└── README.md            # You are here!
```

---

## 📸 Snapshots

<div align="center">
  <img src="dark_theme_ss.png" alt="Sociopedia Dark Mode" width="800" style="border-radius: 12px; border: 1px solid #333;">
</div>

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.

---

*Project inspired by tutorials from EdRoh and enhanced with premium UI and backend security.*
