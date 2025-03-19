import { env } from "../utils";

export const s3 = {
  region: env("AWS_REGION"),
  key: env("AWS_ACCESS_KEY_ID"),
  secret: env("AWS_SECRET_ACCESS_KEY"),
  endpoint: env("AWS_ENDPOINT"),
  bucket: env("AWS_BUCKET"),
};
