import z from "zod";
import bcrypt from "bcrypt";
import User from "../../models/userModel";

/**
 * Create user register validator
 */
export const registerValidator = z
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
 * User login validator
 */
export const loginValidator = z
  .object({
    email: z
      .string({
        invalid_type_error: "Email is required",
      })
      .email({
        message: "Invalid email format",
      }),
    password: z
      .string({
        required_error: "Password is required",
        invalid_type_error: "Password is a string",
      })
      .min(6, {
        message: "Password must be at least 6 characters",
      }),
  })
  .superRefine(async (data, ctx) => {
    const user = await User.query().where("email", data.email).first();
    if (!user) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "User not found",
        path: ["email"],
      });
    }
    if (user && !(await bcrypt.compare(data.password, user.password))) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Invalid credentials",
        path: ["password"],
      });
    }
  });

export type RegisterInput = z.infer<typeof registerValidator>;
export type LoginInput = z.infer<typeof loginValidator>;
