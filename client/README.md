# 🌐 Sociopedia — Client (React Frontend)

This is the **frontend** of **Sociopedia**, built using modern React tools like **Redux Toolkit** and **Material UI**. It communicates with the backend server to provide a full social media experience.

---

## 🚀 Features

* 🔐 Register & Login users (JWT आधारित authentication)
* 📝 Create, view, like, and unlike posts
* 🖼️ Upload images
* 👥 Add / Remove friends
* 👤 View user profiles
* 💾 Persistent login sessions

---

## 🎨 Tech Stack

### Frontend

* React.js
* React Router
* Redux Toolkit
* Redux Persist
* Material UI (MUI)
* Formik + Yup (Forms & Validation)

---

## 📁 Folder Structure

```
client/
│── public/
│── src/
│   ├── components/     # Reusable UI components
│   ├── pages/          # Login, Home, Profile pages
│   ├── state/          # Redux store and slices
│   ├── theme.js        # MUI theme configuration
│   ├── App.js
│   └── index.js
│── package.json
```

---

## ⚙️ Installation & Setup

### 1️⃣ Install Dependencies

Navigate to the client folder and run:

```bash
npm install
```

---

### ▶️ 2️⃣ Run the App

```bash
npm start
```

The app will run on:

```
http://localhost:3000
```

---

### ⚠️ Backend Requirement

Ensure your backend server is running at:

```
http://localhost:6001
```

---

## 🔗 API Integration

* Uses `fetch()` for API calls
* Base URL typically stored in a config file
* Secure routes require JWT token
* Token is stored via Redux Persist

---

## 📌 Pages

### 🏠 Home Page

* Displays global feed
* Shows posts from all users
* Create new posts
* Like / Unlike posts

---

### 👤 Profile Page

* User personal details
* User posts
* Friend list

---

### 🔐 Login / Register

* Form validation using Formik + Yup
* JWT-based authentication
* Persistent login sessions

---

## 📦 Redux State Structure

```
state/
│── authSlice.js     # Manages user & token
│── postsSlice.js    # Stores posts
│── store.js         # Configures Redux store
```

* Uses **Redux Persist** to store user session in local storage

---

## 🎨 Material UI Theme

Supports **Dark / Light mode**:

* Custom primary colors
* Background themes
* Typography settings

Theme switching is managed via Redux.

---

## 🖼️ Image Uploads

* Uses `FormData()` to upload images
* Sends request to backend:

```
POST /posts
```

---

## 📝 Notes

* Requires **Node.js v18+**
* Ensure backend `.env` is properly configured
* MongoDB connection must be active
* This frontend works together with the Sociopedia backend

---

## 📌 Summary

Sociopedia Client is a modern, responsive React frontend that delivers a full-featured social media UI with authentication, real-time interactions, and persistent state management.

---
