import express from "express";
import userRoutes from "./routes/userRoutes.js";
import notesRoutes from "./routes/notesRoutes.js";
import cookieParser from "cookie-parser";
const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth/", userRoutes);
app.use("/api/notes/", notesRoutes);

export default app;
