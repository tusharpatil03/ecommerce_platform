import { Request, Response } from 'express';
import { InterfaceUser, User } from '../../models/User';
import bcrypt from 'bcrypt';
import HandleError from '../../utils/Error/Error';
import {
  generateAccessToken,
  generateRefreshToken,
  InterfaceAccessTokenPayload,
  InterfaceRefreshTokenPayload,
} from '../../utils/auth';

export type SignupInfo = {
  email: string;
  password: string;
};

export const signup = async (req: Request, res: Response): Promise<void> => {
  const data: SignupInfo = req.body;

  const existingUser = await User.findOne({
    email: data.email,
  });
  if (existingUser) {
    throw new HandleError(
      'USER ALREADY EXIST',
      'user already exist, try to login',
      400,
    );
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(data.password, salt);

  const user: InterfaceUser = (await User.create({
    email: data.email,
    password: hashedPassword,
    salt: salt,
  })) as InterfaceUser;

  if (!user) {
    throw new HandleError('User Not Exist', 'Unable to Create User', 500);
  }

  const JwtPayload: InterfaceAccessTokenPayload = {
    email: data.email,
    userId: user._id.toString(),
  };

  const accessToken = generateAccessToken(JwtPayload);
  const refreshToken = generateRefreshToken({
    ...JwtPayload,
    token_version: user.token_version,
  } as InterfaceRefreshTokenPayload);

  if (!accessToken || !refreshToken) {
    throw new HandleError('JWT ERROR', 'unable to create JWT tokens', 500);
  }

  await User.updateOne(
    {
      id: user._id,
    },
    {
      token: refreshToken,
      $inc: { token_version: 1 },
    },
  );

  res.cookie('token', accessToken, {
    domain: 'localhost',
    path: '/',
    httpOnly: true,
    secure: true,
  });

  res.status(201).json({
    accessToken: accessToken,
    refreshToken: refreshToken,
  });
};
