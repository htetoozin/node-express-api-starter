import { Router, Request, Response } from "express";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.json({ message: "Welcome from NODE JS EXPRESS Starter KIT! 😎 👨‍💻" });
});

export default router;
