import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { ACCESS_TOKEN_SECRET } from '../globals';
import HandleError from '../utils/Error/Error';

export interface SessionData {
  userId: string;
  email: string;
  expired: boolean;
  isAuth: boolean;
}

export const isAuth = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

    if (!token) {
      return next(new HandleError('UNAUTHORIZED', 'No token provided', 401));
    }

    const decoded = jwt.verify(
      token,
      ACCESS_TOKEN_SECRET as string,
    ) as JwtPayload;

    const userData = decoded?.data;

    if (!userData?.userId || !userData?.email) {
      return next(
        new HandleError('UNAUTHORIZED', 'Invalid token structure', 403),
      );
    }

    req.session = {
      userId: userData.userId,
      email: userData.email,
      isAuth: true,
      expired: false,
    };

    next();
  } catch (error: any) {
    const isExpired = error?.name === 'TokenExpiredError';

    req.session = {
      userId: '',
      email: '',
      isAuth: false,
      expired: isExpired,
    };

    next(
      new HandleError(
        'UNAUTHORIZED',
        isExpired ? 'Token expired' : 'Invalid or malformed token',
        401,
      ),
    );
  }
};
