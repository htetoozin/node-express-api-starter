import express, { Express, Request, Response } from "express";
import userRoute from "@routes/user";

const app: Express = express();

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Hello TypeScript with Node.js!" });
});

app.use(userRoute);

export default app;
