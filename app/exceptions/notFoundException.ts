import { Request, Response, NextFunction } from "express";

const notFoundException = (req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    success: false,
    status: "fail",
    message: "route not found",
  });
};

export default notFoundException;
