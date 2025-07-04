import { SignupInfo } from './signup';
import { InterfaceUser, User } from '../../models/User';
import HandleError from '../../utils/Error/Error';
import {
  generateAccessToken,
  generateRefreshToken,
  InterfaceAccessTokenPayload,
  InterfaceRefreshTokenPayload,
} from '../../utils/auth';
import bcrypt from 'bcrypt';
import { Request, Response } from 'express';

export const login = async (req: Request, res: Response): Promise<void> => {
  const data: SignupInfo = req.body;

  try {
    const user: InterfaceUser = (await User.findOne({
      email: data.email,
    })
      .select('password')
      .lean()) as InterfaceUser;

    if (!user) {
      throw new HandleError('USER NOT EXIST', 'user not found', 400);
    }

    const isValidPassword: boolean = await bcrypt.compare(
      data.password,
      user.password,
    );

    if (!isValidPassword) {
      throw new HandleError('Wrong Password', 'Incorrect Password', 400);
    }

    const accessTokenPayload: InterfaceAccessTokenPayload = {
      email: data.email,
      userId: user._id.toString(),
    };

    const refreshTokenPayload: InterfaceRefreshTokenPayload = {
      email: data.email,
      userId: user._id.toString(),
      token_version: user.token_version || 0,
    };

    const accessToken = generateAccessToken(accessTokenPayload);
    const refreshToken = generateRefreshToken(refreshTokenPayload);

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

    res.status(200).json({
      message: 'login success',
      accessToken: accessToken,
      refreshToken: refreshToken,
    });
  } catch (e: unknown | HandleError) {
    console.log(e);
    res.status(500).json({
      message: e,
    });
  }
};
