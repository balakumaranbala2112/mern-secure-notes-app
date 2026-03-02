# 📝 NoteVault — MERN Notes App

A full-stack notes management application built with the MERN stack (MongoDB, Express, React, Node.js). Users can register, log in, and manage their personal notes with full CRUD operations — all secured with JWT authentication via HTTP-only cookies.

---

## 🌐 Live Demo

> Coming soon — deploy on Render (backend) + Vercel (frontend)

---

## ✨ Features

- 🔐 **JWT Authentication** — Secure login & registration with HTTP-only cookies
- 📝 **Full CRUD** — Create, Read, Update, Delete notes
- 🔍 **Search** — Filter notes by title, content, or tag in real time
- 🏷️ **Tags** — Organize notes with comma-separated tags
- 🛡️ **Protected Routes** — `/notes` is only accessible when logged in
- 🎨 **Clean UI** — Built with Tailwind CSS and react-hot-toast notifications
- 📱 **Responsive** — Works on mobile, tablet, and desktop

---

## 🛠️ Tech Stack

### Backend
| Technology | Purpose |
|---|---|
| Node.js | JavaScript runtime |
| Express.js | Web framework & routing |
| MongoDB | NoSQL database |
| Mongoose | MongoDB object modeling (ODM) |
| JSON Web Token (JWT) | Authentication tokens |
| bcryptjs | Password hashing |
| cookie-parser | HTTP cookie middleware |
| cors | Cross-Origin Resource Sharing |
| dotenv | Environment variable management |
| validator | Email validation |

### Frontend
| Technology | Purpose |
|---|---|
| React 19 | UI library |
| Vite | Build tool & dev server |
| React Router DOM v7 | Client-side routing |
| Axios | HTTP client |
| Tailwind CSS v3 | Utility-first CSS framework |
| react-hot-toast | Toast notifications |
| react-icons | Icon library |

---

## 📁 Project Structure

```
notesapp/
├── backend/
│   ├── .env                        # Environment variables (secrets)
│   ├── server.js                   # Entry point — starts HTTP server
│   ├── app.js                      # Express app — middleware & routes
│   ├── config/
│   │   └── db.js                   # MongoDB connection
│   ├── models/
│   │   ├── User.js                 # User schema (name, email, password)
│   │   └── Notes.js                # Note schema (title, content, tags, user)
│   ├── controllers/
│   │   ├── userControllers.js      # register / login / logout logic
│   │   └── notesController.js      # CRUD logic for notes
│   ├── routes/
│   │   ├── userRoutes.js           # /api/auth/* endpoints
│   │   └── notesRoutes.js          # /api/notes/* endpoints
│   └── helper/
│       ├── jwtToken.js             # Creates JWT & sets cookie
│       └── useAuth.js              # Middleware to verify JWT
│
└── frontend/
    ├── .env                        # VITE_API_URL (must match backend port)
    ├── index.html                  # HTML shell — React mounts here
    └── src/
        ├── main.jsx                # React entry point
        ├── index.css               # Tailwind base styles
        ├── NotFound.jsx            # 404 page
        ├── api/
        │   ├── axiosInstance.js    # Shared axios config
        │   ├── authApi.js          # Auth API calls
        │   └── notesApi.js         # Notes CRUD API calls
        ├── context/
        │   └── AuthContext.jsx     # Global user state
        ├── components/
        │   ├── Navbar.jsx          # Top navigation bar
        │   ├── NoteCard.jsx        # Single note card
        │   ├── NoteModal.jsx       # Create / Edit modal
        │   └── ProtectedRoute.jsx  # Route guard
        ├── layouts/
        │   └── MainLayout.jsx      # Shared layout (Navbar + Outlet)
        ├── pages/
        │   ├── Login.jsx           # Login page
        │   ├── Register.jsx        # Register page
        │   └── Notes.jsx           # Notes dashboard
        ├── routes/
        │   └── routes.jsx          # All URL → component mappings
        └── utils/
            └── formatDate .js      # Date formatting helper
```

---

## ⚙️ Getting Started

### Prerequisites

Make sure you have these installed:

- [Node.js](https://nodejs.org/) v18 or higher
- [MongoDB](https://www.mongodb.com/) running locally, or a [MongoDB Atlas](https://www.mongodb.com/atlas) connection string
- npm (comes with Node.js)

---

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/notesapp.git
cd notesapp
```

---

### 2. Set Up the Backend

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend/` folder:

```env
# Server
PORT=3500

# Database
MONGO_URI=mongodb://127.0.0.1:27017/notesApp

# JWT
JWT_SECRET=your_super_secret_key_here
JWT_EXPIRES_IN=7d

# Cookie
COOKIE_EXPIRE=3

# CORS — must match your frontend dev server URL
CLIENT_URL=http://localhost:5173
```

Start the backend server:

```bash
npm run dev
```

Expected output:
```
Server is listening on 3500
MongoDB Connected Successfully
```

---

### 3. Set Up the Frontend

Open a **new terminal tab**, then:

```bash
cd frontend
npm install
```

Create a `.env` file inside the `frontend/` folder:

```env
VITE_API_URL=http://localhost:3500
```

> ⚠️ This port **must match** the `PORT` value in `backend/.env`

Start the frontend dev server:

```bash
npm run dev
```

Expected output:
```
VITE v8.x.x  ready in 300ms
➜  Local:   http://localhost:5173/
```

---

### 4. Open the App

Visit **http://localhost:5173** in your browser.

---

## 🔌 API Endpoints

### Auth Routes — `/api/auth`

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| POST | `/api/auth/register` | Register a new user | No |
| POST | `/api/auth/login` | Login existing user | No |
| GET | `/api/auth/logout` | Logout (clears cookie) | No |

### Notes Routes — `/api/notes`

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| GET | `/api/notes/` | Get all notes for logged-in user | ✅ Yes |
| POST | `/api/notes/create` | Create a new note | ✅ Yes |
| POST | `/api/notes/update` | Update a note (send `id` in body) | ✅ Yes |
| POST | `/api/notes/delete` | Delete a note (send `id` in body) | ✅ Yes |

### Request / Response Examples

**Register**
```json
// POST /api/auth/register
// Body:
{
  "name": "Balakrishnan",
  "email": "bk@example.com",
  "password": "securepass123"
}

// Response 201:
{
  "success": true,
  "user": { "_id": "...", "name": "Balakrishnan", "email": "bk@example.com" },
  "token": "eyJhbGci..."
}
```

**Create Note**
```json
// POST /api/notes/create
// Body:
{
  "title": "React Hooks",
  "content": "useState manages local state, useEffect handles side effects.",
  "tags": ["react", "hooks", "frontend"]
}

// Response 201:
{
  "success": true,
  "note": {
    "_id": "...",
    "title": "React Hooks",
    "content": "...",
    "tags": ["react", "hooks", "frontend"],
    "user": "...",
    "createdAt": "...",
    "updatedAt": "..."
  }
}
```

---

## 🗄️ Database Schemas

### User
```js
{
  name:      String,   // required
  email:     String,   // required, unique, validated
  password:  String,   // required, min 8 chars, hashed with bcrypt, hidden from queries
  role:      String,   // default: "user"
  createdAt: Date,     // auto
  updatedAt: Date      // auto
}
```

### Note
```js
{
  title:     String,    // required
  content:   String,    // required
  tags:      [String],  // default: []
  user:      ObjectId,  // ref: "User" — ownership link
  createdAt: Date,      // auto
  updatedAt: Date       // auto
}
```

---

## 🔐 How Authentication Works

```
1. User submits login form
2. Backend validates credentials
3. bcrypt.compare() checks password against stored hash
4. JWT token is generated and set as an HTTP-only cookie
5. Browser automatically sends this cookie with every future request
6. verifyUser middleware reads & verifies the cookie on protected routes
7. If valid → req.user is set → controller runs
8. If invalid/missing → 401 Unauthorized is returned
```

**Why HTTP-only cookies instead of localStorage?**

HTTP-only cookies cannot be read by JavaScript. This protects the token from XSS (Cross-Site Scripting) attacks — malicious scripts running on the page cannot steal the token.

---

## 🚦 How Routing Works

```
Browser visits /notes
    ↓
React Router → ProtectedRoute
    ↓
useAuth() checks user state in AuthContext
    ↓
user exists?   ✅ → render Notes page
user is null?  ❌ → redirect to /login
```

```
Browser visits /login
    ↓
Login.jsx → handleSubmit
    ↓
AuthContext.login() → authApi.loginApi()
    ↓
POST /api/auth/login → backend sets JWT cookie
    ↓
AuthContext: setUser(data.user)
    ↓
navigate('/notes')
```

---

## 📜 Available Scripts

### Backend
```bash
npm run dev     # Start with nodemon (auto-restart on changes)
npm start       # Start without nodemon (production)
```

### Frontend
```bash
npm run dev     # Start Vite dev server
npm run build   # Build for production (output in /dist)
npm run preview # Preview the production build locally
```

---

## 🚀 Deployment Guide

### Backend — Deploy on Render

1. Push code to GitHub
2. Go to [render.com](https://render.com) → New Web Service
3. Connect your GitHub repo, select the `backend/` folder
4. Build Command: `npm install`
5. Start Command: `npm start`
6. Add environment variables (from your `.env`) in the Render dashboard
7. Update `CLIENT_URL` to your Vercel frontend URL

### Frontend — Deploy on Vercel

1. Go to [vercel.com](https://vercel.com) → New Project
2. Connect your GitHub repo, set Root Directory to `frontend/`
3. Add environment variable: `VITE_API_URL=https://your-render-backend-url.onrender.com`
4. Deploy

---

## 🔮 Future Improvements

- [ ] Persistent login (check auth status on page refresh)
- [ ] Note pinning and archiving
- [ ] Rich text editor for note content
- [ ] Note colour customisation
- [ ] Email verification on registration
- [ ] Password reset via email
- [ ] Dark mode toggle
- [ ] Note sharing between users
- [ ] Export notes as PDF

---

## 🤝 Contributing

1. Fork this repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m "feat: add your feature"`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

---

## 👤 Author

**Balakrishnan**
- GitHub: [@your-username](https://github.com/balakumaranbala2112)

---

> Built to practise and understand the complete MERN stack — from MongoDB schema design to React Context and JWT cookie authentication.
