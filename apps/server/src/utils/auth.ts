import jwt from 'jsonwebtoken';
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from '../globals';

export interface InterfaceJwtPayload {
  userId: string;
  email: string;
}
export const generateAccessToken = (payload: InterfaceJwtPayload): string => {
  const token: string = jwt.sign(
    {
      data: {
        email: payload.email,
        userId: payload.userId,
      },
    },
    ACCESS_TOKEN_SECRET as string,
    {
      expiresIn: 30 * 60 * 1000,
    },
  );
  return token;
};

export const generateRefreshToken = (payload: InterfaceJwtPayload): string => {
  const token: string = jwt.sign(
    {
      data: {
        email: payload.email,
        userId: payload.userId,
      },
    },
    REFRESH_TOKEN_SECRET as string,
    {
      expiresIn: '30d',
    },
  );

  return token;
};
