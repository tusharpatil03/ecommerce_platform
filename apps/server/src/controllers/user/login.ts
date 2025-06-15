import { SignupInfo } from './signup';
import { User } from '../../models/User';
import HandleError from '../../utilities/Error/Error';
import {
  generateAccessToken,
  generateRefreshToken,
  InterfaceJwtPayload,
} from '../../utilities/auth';
import bcrypt from 'bcrypt';
import { Request, Response } from 'express';

export const login = async (req: Request, res: Response): Promise<void> => {
  const data: SignupInfo = req.body;

  try {
    const user = await User.findOne({
      email: data.email,
    }).select('password');

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

    const JwtPayload: InterfaceJwtPayload = {
      email: data.email,
      userId: user.id,
    };

    const accessToken = generateAccessToken(JwtPayload);
    const refreshToken = generateRefreshToken(JwtPayload);

    if (!accessToken || !refreshToken) {
      throw new HandleError('JWT ERROR', 'unable to create JWT tokens', 500);
    }

    await User.updateOne(
      {
        id: user.id,
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
