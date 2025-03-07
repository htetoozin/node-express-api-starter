import { sutando } from "sutando";
import dotenv from "dotenv";

dotenv.config();

sutando.addConnection({
  client: "mysql2",
  connection: {
    host: process.env.DB_HOST || "127.0.0.1",
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306,
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "node_ts",
  },
});

export const db = sutando;
