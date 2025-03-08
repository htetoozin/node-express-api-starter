import { Request, Response } from "express";
import User, { UserType } from "../models/userModel";
import { createUserValidation } from "../validation/userValidation";

export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await User.query().paginate();

    res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        error instanceof Error ? error.message : "Unknown error occurred",
    });
  }
};

export const getUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const user = await User.query().find(id);
    if (!user) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
      return;
    }
    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        error instanceof Error ? error.message : "Unknown error occurred",
    });
  }
};

export const createUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const data = createUserValidation.safeParse(req.body);
    if (!data.success) {
      res.status(400).json({
        success: false,
        message: "Invalid data",
        errors: data.error.errors,
      });
      return;
    }
    const { name, email, password } = req.body;
    const user = await User.query().create({
      name,
      email,
      password,
    });
    res.status(201).json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        error instanceof Error ? error.message : "Unknown error occurred",
    });
  }
};
