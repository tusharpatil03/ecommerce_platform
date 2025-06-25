import jwt from 'jsonwebtoken';
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from '../globals';
import { Types } from 'mongoose';
import { User } from '../models/User';
import HandleError from './Error/Error';

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
      expiresIn: 24 * 60 * 60,
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

export const revokeRefreshToken = async (userId: string): Promise<void> => {
  try {
    await User.findOneAndUpdate(
      { _id: userId },
      { $set: { token: '' } },
      { runValidators: true },
    );
  } catch (e) {
    throw new HandleError(
      'REVOKE_FAILED',
      'unbale to set token value null',
      500,
    );
  }
  return;
};
