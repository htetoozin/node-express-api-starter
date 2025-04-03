import jwt from "jsonwebtoken";
import { db } from "../config/database";
import { jwt as jwtConfig } from "../config/app";

/**
 * Create jwt token with userId
 * @param userId
 * @param tokenType
 * @returns
 */
export const createToken = async (
  userId: number,
  tokenType: string = "User"
): Promise<string> => {
  const token = jwt.sign({ userId, tokenType }, jwtConfig.secret, {
    expiresIn: jwtConfig.expire,
  });

  //previous jwt token delete
  await db
    .table("jwt_access_token")
    .where("token_type", tokenType)
    .where("token_id", userId)
    .delete();

  await db.table("jwt_access_token").insert({
    token_id: userId,
    token_type: tokenType,
    token: token,
    last_used_at: new Date(),
    created_at: new Date(),
    updated_at: new Date(),
  });

  return token;
};

/**
 * Get jwt token
 * @param token
 * @returns
 */
export const getToken = async (
  userId: number,
  tokenType: string = "User",
  token: string
): Promise<boolean> => {
  return (await db
    .table("jwt_access_token")
    .where("token_id", userId)
    .where("token_type", token)
    .where("token", tokenType)
    .first())
    ? true
    : false;
};
