import z from "zod";
import User from "../../models/userModel";

/**
 * Password reset validator
 */
export const passwordResetValidator = z
  .object({
    email: z
      .string({
        invalid_type_error: "Email is required",
      })
      .email({
        message: "Invalid email format",
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
  });

export type passwordResetInput = z.infer<typeof passwordResetValidator>;
