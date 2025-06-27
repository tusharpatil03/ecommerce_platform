import jwt from 'jsonwebtoken';
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from '../globals';
import { Types } from 'mongoose';
import { User } from '../models/User';
import HandleError from './Error/Error';

export interface InterfaceAccessTokenPayload {
  userId: string;
  email: string;
}
export const generateAccessToken = (
  payload: InterfaceAccessTokenPayload,
): string => {
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

export interface InterfaceRefreshTokenPayload
  extends InterfaceAccessTokenPayload {
  token_version: number;
}

export const generateRefreshToken = (
  payload: InterfaceRefreshTokenPayload,
): string => {
  const token: string = jwt.sign(
    {
      data: {
        email: payload.email,
        userId: payload.userId,
        token_version: payload.token_version,
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
