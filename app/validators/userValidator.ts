import z from "zod";
import User from "../models/userModel";

/**
 * Create user validator
 */
export const createUserValidator = z
  .object({
    name: z.string({
      required_error: "Name is required",
      invalid_type_error: "Name is a string",
    }),
    email: z
      .string({
        invalid_type_error: "Email is required",
      })
      .email({
        message: "Invalid email format",
      })
      .superRefine(async (email, ctx) => {
        const user = await User.query().where("email", email).first();
        if (user) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Email already exists",
            path: ["email"],
          });
        }
      }),
    password: z
      .string({
        required_error: "Password is required",
        invalid_type_error: "Passowrd is a string",
      })
      .min(6, {
        message: "Password must be at least 6 characters",
      }),
    password_confirmation: z.string({
      required_error: "Password confirmation is required",
    }),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Passwords doesn't match",
    path: ["password_confirmation"],
  });

/**
 * Update user validator
 */
export const updateUserValidator = (userId: number) =>
  z.object({
    name: z.string({
      required_error: "Name is required",
      invalid_type_error: "Name is a string",
    }),
    email: z
      .string({
        required_error: "Email is required",
      })
      .email({
        message: "Invalid email format",
      })
      .superRefine(async (email, ctx) => {
        const user = await User.query()
          .where("id", "!=", userId)
          .where("email", email)
          .first();
        if (user) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Email is already taken by other user",
            path: ["email"],
          });
        }
      }),
    role_id: z.number({
      required_error: "Role ID is required",
      invalid_type_error: "Role ID is an integer",
    }),
    password: z
      .string()
      .min(6, {
        message: "Password must be at least 6 characters",
      })
      .nullable(),
  });

export type CreateUserInput = z.infer<typeof createUserValidator>;
export type UpdateUserInput = z.infer<ReturnType<typeof updateUserValidator>>;
