import { env } from "../utils";

/**
 * Image upload max file size with MB
 */
export const MAX_FILE_SIZE = 1;

/**
 * Image upload accepted types
 */
export const ACCEPTED_FILE_TYPES = ["jpeg", "jpg", "png"];

/**
 * 400 Bad validaion error default message
 */
export const INVALID_DATA = "Invalid Data";

/**
 * 401 Unauthorized error default message
 */
export const UNAUTHORIZED = "Unauthorized";

/**
 * JWT credentials
 */
export const jwt = {
  expire: env("JWT_EXPIRE_TIME", 18000), // 5 hours
  secret: env("JWT_SECRET", "secret"),
};

/**
 * One Signal credentials
 */
export const oneSignal = {
  appId: env("ONE_SIGNAL_APP_ID"),
  appToken: env("ONE_SIGNAL_APP_TOKEN"),
};
