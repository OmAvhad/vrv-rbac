import dotenv from "dotenv";

dotenv.config();

export const PORT = process.env.PORT || 3000;
export const MONGO_URI =
  process.env.MONGO_URI || "mongodb://localhost:27017/notes";
export const JWT_SECRET = process.env.JWT_SECRET;
