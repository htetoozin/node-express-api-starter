import express, { Express } from "express";
import dotenv from "dotenv";

import apiRoute from "./routes/api";
import welcomeRoute from "./routes/welcome";

const morgan = require("morgan");

dotenv.config();

const app: Express = express();

//Development Logging
if (process.env.APP_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());

app.use("/api", apiRoute);
app.use(welcomeRoute);

export default app;
