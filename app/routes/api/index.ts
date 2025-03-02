import { Router } from "express";
import userRoute from "./user";

const router = Router();

router.use(userRoute);

export default router;
