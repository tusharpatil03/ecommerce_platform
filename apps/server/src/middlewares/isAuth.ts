import { NextFunction, Request, Response } from 'express';
import jwt, { VerifyErrors } from 'jsonwebtoken';
import { JWT_SECRET } from '../globals';
import HandleError from '../utilities/Error/Error';

export const isAuth = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return next(
        new HandleError('UNAUTHORIZED ERROR', 'No token provided', 401),
      );
    }

    jwt.verify(
      token,
      JWT_SECRET as string,
      (err: VerifyErrors | null, decoded: any) => {
        if (err) {
          throw new HandleError('UNAUTHORIZED ERROR', err.message, 403);
        }

        req.cookies.userId = decoded.data.userId;
        req.cookies.email = decoded.data.email;
      },
    );

    next();
  } catch (e) {
    next(e);
  }
};
