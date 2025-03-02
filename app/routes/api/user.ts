import { Router, Request, Response } from "express";

const router = Router();

router.get("/users", (req: Request, res: Response) => {
  console.log(req);
  res.json({ message: "Hello Users!" });
});

export default router;
