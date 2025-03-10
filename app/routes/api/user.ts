import { Router } from "express";
import {
  createUser,
  getUser,
  getUsers,
  updateUser,
} from "../../controllers/userController";

const router = Router();

router.get("/users", getUsers);
router.get("/users/:id", getUser);
router.post("/users", createUser);
router.patch("/users/:id", updateUser);

export default router;
