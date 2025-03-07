import dotenv from "dotenv";
dotenv.config();

/** Get env variable with default value */
export const env = (name: string, value: string) => {
  return process.env[name] || value;
};
