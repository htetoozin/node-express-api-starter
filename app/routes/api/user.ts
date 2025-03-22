import { Router } from "express";
import {
  createUser,
  getUser,
  getUsers,
  updateUser,
  deleteUser,
  uploadImage,
} from "../../controllers/userController";
import { sendEmail } from "../../services/emailService";

const router = Router();

router.get("/users", getUsers);
router.get("/users/:id", getUser);
router.post("/users", createUser);
router.patch("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);

router.post("/users/:id/upload-image", uploadImage);

export default router;
