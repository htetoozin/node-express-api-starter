const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  client: "mysql2",
  connection: {
    host: process.env.DB_HOST || "127.0.0.1",
    database: process.env.DB_NAME || "node_ts",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
  },
  migrations: {
    table: "migrations",
    path: "./app/database/migrations",
  },
  models: {
    path: "./models",
  },
};
