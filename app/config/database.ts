import { sutando } from "sutando";
import { env } from "../utils";

sutando.addConnection({
  client: "mysql2",
  connection: {
    host: env("DB_HOST", "127.0.0.1"),
    database: env("DB_NAME", "node_ts"),
    user: env("DB_USERNAME", "root"),
    password: env("DB_PASSWORD", ""),
  },
});

export const db = sutando;
