import { Router } from "express";
import { auth } from "../../middlewares/authMiddleware";
import {
  createUser,
  getUser,
  getUsers,
  updateUser,
  deleteUser,
  uploadImage,
  sendNotification,
} from "../../controllers/userController";

const router = Router();

//Unauthenticated
router.get("/users", getUsers);
router.get("/users/:id", getUser);

//Authenticated
router.post("/users", auth, createUser);
router.patch("/users/:id", auth, updateUser);
router.delete("/users/:id", auth, deleteUser);

//upload image
router.post("/users/:id/upload-image", auth, uploadImage);

//push notification
router.post("/users/:id/send-notification", auth, sendNotification);

export default router;
