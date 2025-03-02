import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import userRoute from "./routes/api/user";
import welcomeRoute from "./routes/welcome";

dotenv.config();

const app: Express = express();

app.use(express.json());
app.use(welcomeRoute);

app.use(userRoute);

export default app;
