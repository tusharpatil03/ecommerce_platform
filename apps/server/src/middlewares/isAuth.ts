import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { ACCESS_TOKEN_SECRET } from '../globals';
import HandleError from '../utils/Error/Error';

export const isAuth = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    if (!token) {
      return next(
        new HandleError('UNAUTHORIZED ERROR', 'No token provided', 401),
      );
    }

    const decoded: JwtPayload = jwt.verify(
      token,
      ACCESS_TOKEN_SECRET as string,
    ) as JwtPayload;

    if (!decoded.data.userId || !decoded.data.email) {
      throw new HandleError('UNAUTHORIZED ERROR', 'Invalid Token', 403);
    }

    req.user = { id: decoded.data.userId, email: decoded.data.email };
    next();
  } catch (e) {
    next(e);
  }
};
