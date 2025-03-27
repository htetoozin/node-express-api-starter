import { Request, Response, NextFunction } from "express";
import validatorMiddleware from "../../middlewares/validatorMiddleware";
import { passwordResetValidator } from "../../validators/auth/forgotPasswordValidator";
import asyncHandler from "../../middlewares/asyncHandlerMiddleware";
import { random, responseError, responseSuccess } from "../../utils";
import { INVALID_DATA } from "../../config/app";
import { StatusCode } from "../../enums/statusCode";
import User from "../../models/userModel";
import { sendEmail } from "../../services/emailService";
import { userResource } from "../../resources/users/userResource";

/**
 * Send a password reset link to the user's email.
 */
export const passwordReset = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { success, data, errors } = await validatorMiddleware(
      passwordResetValidator,
      req.body
    );

    if (!success) {
      return responseError(res, INVALID_DATA, StatusCode.BAD_REQUEST, errors);
    }

    const user = await User.query().where("email", data.email).first();

    if (user) {
      const newPassword = random(8);

      await user.update({
        password: newPassword,
      });

      const description = `
        You have requested to reset your password.
        Here is your new password: <b> ${newPassword} </b>
        <br />
        Please change your password after logging in.
      `;

      sendEmail(
        user.email,
        "New Password!",
        user.name,
        `Password Reset`,
        description
      );

      return responseSuccess(
        res,
        userResource(user),
        "Email sent successfully",
        StatusCode.OK
      );
    }
  }
);
