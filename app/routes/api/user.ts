import { Router } from "express";
import { getUser, getUsers } from "../../controllers/userController";

const router = Router();

router.get("/users", getUsers);
router.get("/users/:id", getUser);

export default router;
