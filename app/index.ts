import express, { Express } from "express";
import dotenv from "dotenv";
import apiRoute from "./routes/api";
import welcomeRoute from "./routes/welcome";

dotenv.config();

const app: Express = express();

app.use(express.json());

app.use("/api", apiRoute);
app.use(welcomeRoute);

export default app;
