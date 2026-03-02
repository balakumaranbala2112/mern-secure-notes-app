import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes.js";
import notesRoutes from "./routes/notesRoutes.js";

const app = express();

// ✅ CORS must come BEFORE routes — lets your React frontend (localhost:5173)
// send requests to this backend. Without this, every request gets blocked
// by the browser with "CORS policy" error and your frontend breaks completely.
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true, // ← Required to allow cookies (JWT token) to be sent
  }),
);

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth/", userRoutes);
app.use("/api/notes/", notesRoutes);

export default app;
