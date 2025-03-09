import z from "zod";
import User from "../models/userModel";

export const createUserValidator = z
  .object({
    name: z.string({
      invalid_type_error: "Name is required",
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
        invalid_type_error: "Password is required",
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

export type CreateUserInput = z.infer<typeof createUserValidator>;
