import { Request, Response } from "express";

interface InterfaceHello extends Response {
    message: string,
}
export const hello = (req: Request, res: Response): void => {
    res.json({
        message: "Hello",
        status: 200,
    })
}