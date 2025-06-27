import { Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { REFRESH_TOKEN_SECRET } from '../../globals';
import {
  generateAccessToken,
  InterfaceRefreshTokenPayload,
  InterfaceAccessTokenPayload,
} from '../../utils/auth';
import { User } from '../../models/User';
import HandleError from '../../utils/Error/Error';

export const extendSession = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const refreshToken: string = req.body.refreshToken;
  if (!refreshToken) {
    throw new HandleError('NOT_EXIST', 'provide refresh token', 400);
  }

  const decoded = jwt.verify(
    refreshToken,
    REFRESH_TOKEN_SECRET as string,
  ) as JwtPayload;
  const data: InterfaceRefreshTokenPayload = decoded.data;

  if (!data || !data.userId || !data.email) {
    res.status(401).json({
      message: 'Invalid refresh token',
    });
    return;
  }

  const user = await User.findOne({ _id: data.userId }).select({ id: true });
  if (!user) {
    throw new HandleError('NOT_FOUND', 'user not found', 400);
  }

  if (user.token_version !== data.token_version) {
    throw new HandleError('INVALID_TOKEN', 'refresh token is not valid', 400);
  }

  const jwtPayload: InterfaceAccessTokenPayload = {
    userId: data.userId,
    email: data.email,
  };
  const newAccessToken = generateAccessToken(jwtPayload);

  res.cookie('token', newAccessToken, { httpOnly: true, secure: true });

  res.status(200).json({
    accessToken: newAccessToken,
    message: 'Session extended successfully',
  });
  return;
};
