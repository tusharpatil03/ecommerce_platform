import { SignupInfo } from './signup';
import { User } from '../../models/User';
import HandleError from '../../utilities/Error/Error';
import { generateJwtToken } from '../../utilities/auth';
import { JwtPayload } from '../../utilities/auth';
import bcrypt from 'bcrypt';
import { Request, Response } from 'express';

export const login = async (req: Request, res: Response): Promise<void> => {
  const data: SignupInfo = req.body;
  console.log(req.body);
  try {
    if (!data || !data.email || !data.password) {
      throw new HandleError('VALIDATION ERROR', 'invalid input', 400);
    }
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

    const JwtPayload: JwtPayload = {
      email: data.email,
      userId: user.id,
    };

    const accessToken = generateJwtToken(JwtPayload);

    res.cookie('token', accessToken, {
      domain: 'localhost',
      path: '/',
      httpOnly: true,
      secure: true,
    });

    res.status(200).json({
      message: 'login success',
      token: accessToken,
    });
  } catch (e: unknown | HandleError) {
    console.log(e);
    res.status(500).json({
      message: e,
    });
  }
};
