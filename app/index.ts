import express, { Express } from "express";
import path from "path";
import dotenv from "dotenv";
import morgan from "morgan";

import { db } from "./config/database";

import apiRoute from "./routes/api";
import welcomeRoute from "./routes/welcome";
import errorHandler from "./exceptions/errorException";
import notFoundException from "./exceptions/notFoundException";

dotenv.config();

const app: Express = express();

//Development Logging
if (process.env.APP_ENV === "development") {
  app.use(morgan("dev"));
}

//Database connection
db.connection();

//Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, "public")));

app.use(express.json());

//Routes
app.use("/api", apiRoute);
app.use(welcomeRoute);

//Error Handler
app.all("*", notFoundException);
app.use(errorHandler);

export default app;
