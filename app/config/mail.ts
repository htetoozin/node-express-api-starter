import { env } from "../utils";

export const mail = {
  host: env("MAIL_HOST"),
  port: Number(env("MAIL_PORT", 587)),
  secure: env("MAIL_SECURE", false),
  username: env("MAIL_USERNAME"),
  password: env("MAIL_PASSWORD"),
  address: env("MAIL_FROM_ADDRESS", "hello@node.com"),
  name: env("MAIL_FROM_NAME", "Welcome from Hello Node"),
};
