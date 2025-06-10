import { Request, Response } from "express";

export const hello = (req: Request, res: Response): void => {
  res.json({
    message: "Hello",
    status: 200,
  });
};
