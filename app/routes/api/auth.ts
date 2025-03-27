import { Router } from "express";
import { register, login } from "../../controllers/auth/authController";
import { passwordReset } from "../../controllers/auth/forgotPasswordController";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/forgot-password", passwordReset);

export default router;
