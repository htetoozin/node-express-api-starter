import { Router } from "express";
import {
  createUser,
  getUser,
  getUsers,
} from "../../controllers/userController";

const router = Router();

router.get("/users", getUsers);
router.get("/users/:id", getUser);
router.post("/users", createUser);

export default router;
