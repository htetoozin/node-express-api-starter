import z from "zod";

export const createUserValidator = z
  .object({
    name: z.string({
      required_error: "Name is required",
      invalid_type_error: "Name must be a string",
    }),
    email: z.string().email({
      message: "Email is required",
    }),
    password: z.string().min(6, {
      message: "Password is required",
    }),
    password_confirmation: z.string({
      required_error: "Password confirmation is required",
    }),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Passwords do not match",
    path: ["password_confirmation"],
  });

export type CreateUserInput = z.infer<typeof createUserValidator>;
