import express, { Express } from "express";
import dotenv from "dotenv";
import morgan from "morgan";

import { db } from "./config/database";

//routes
import apiRoute from "./routes/api";
import welcomeRoute from "./routes/welcome";

dotenv.config();

const app: Express = express();

//Development Logging
if (process.env.APP_ENV === "development") {
  app.use(morgan("dev"));
}

//Database connection
db.connection();

app.use(express.json());

app.use("/api", apiRoute);
app.use(welcomeRoute);

export default app;
