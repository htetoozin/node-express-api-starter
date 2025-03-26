import { Router } from "express";
import authRoute from "./auth";
import userRoute from "./user";

const router = Router();

router.use([authRoute]);
router.use([userRoute]);

export default router;
