import { Router } from "express";
import {
  createUser,
  getUser,
  getUsers,
  updateUser,
  deleteUser,
  uploadImage,
} from "../../controllers/userController";
import { sendNoti } from "../../services/notificationService";

const router = Router();

router.get("/users", getUsers);
router.get("/users/:id", getUser);
router.post("/users", createUser);
router.patch("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);

router.post("/users/:id/upload-image", uploadImage);

//push notification
router.post("/users/:id/send-notification", (req, res) => {
  const { title, description } = req.body;

  sendNoti(title, description, [`${req.params.id}`]);
});
export default router;
