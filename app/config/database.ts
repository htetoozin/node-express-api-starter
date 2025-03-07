import { sutando } from "sutando";
import dotenv from "dotenv";

dotenv.config();

export const connection = {
  host: process.env.DB_HOST || "localhost",
  database: process.env.DB_NAME || "node_ts",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
};

//You can add multiple connections
sutando.addConnection({
  client: "mysql2",
  connection,
});

export const db = sutando;
