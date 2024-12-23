import { Router } from "express";
import { login, register, me } from "../controllers/auth-controller.js";
import { authMiddleware } from "../middleware/auth-middleware.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", authMiddleware, me);

export default router;
