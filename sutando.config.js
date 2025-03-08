const { env } = require("./dist/app/utils");

module.exports = {
  client: "mysql2",
  connection: {
    host: env("DB_HOST", "127.0.0.1"),
    database: env("DB_NAME", "node_ts"),
    user: env("DB_USERNAME", "root"),
    password: env("DB_PASSWORD", ""),
  },
  migrations: {
    table: "migrations",
    path: "./app/database/migrations",
  },
  models: {
    path: "./models",
  },
};
