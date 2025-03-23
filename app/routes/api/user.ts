import { Router } from "express";
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

router.get("/users", getUsers);
router.get("/users/:id", getUser);
router.post("/users", createUser);
router.patch("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);

//upload image
router.post("/users/:id/upload-image", uploadImage);

//push notification
router.post("/users/:id/send-notification", sendNotification);

export default router;
