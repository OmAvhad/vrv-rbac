import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth-router.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/auth", authRoutes);

export default app;
