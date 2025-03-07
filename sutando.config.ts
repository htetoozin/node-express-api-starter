import { connection } from "./app/config/database";

require("dotenv").config();

module.exports = {
  client: "mysql2",
  connection,
  migrations: {
    table: "migrations",
    path: "./app/database/migrations",
  },
  models: {
    path: "./models",
  },
};
