import { Router } from "express";
import { register, login, logout } from "../../controllers/auth/authController";
import { passwordReset } from "../../controllers/auth/forgotPasswordController";
import { auth } from "../../middlewares/authMiddleware";

const router = Router();

//Unauthenticated
router.post("/register", register);
router.post("/login", login);
router.post("/forgot-password", passwordReset);

//Authenticated
router.post("/logout", auth, logout);

export default router;
