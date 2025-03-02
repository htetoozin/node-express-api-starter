import { Request, Response, NextFunction } from "express";

export const getUsers = (req: Request, res: Response, next: NextFunction) => {
  const users = [
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane Doe" },
    { id: 3, name: "John Smith" },
  ];

  res.status(200).json({
    message: "Users retrieved successfully",
    data: users,
  });
};
