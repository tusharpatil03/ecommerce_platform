import { Request, Response } from "express";
import { User } from "../../models/User";
import bcrypt from "bcrypt";
import { generateJwtToken } from "../../utilities/auth";
import HandleError from "../../utilities/Error/Error";
type SignupInfo = {
  email: string;
  password: string;
};
export const signup = async (req: Request, res: Response): Promise<void> => {
  const data: SignupInfo = req.body;

  try {
    const existingUser = await User.findOne({
      email: data.email,
    });
    if (existingUser) {
      res.status(400).json({
        message: "User Already Exist",
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(data.password, salt);

    const user = await User.create({
      email: data.email,
      password: hashedPassword,
      salt: salt,
    });

    if (!user) {
      throw new HandleError("User Not Exist", "Unable to Create User", 500);
    }

    const email = "tush@gmail.com";
    const id = "1234";

    const accessToken = generateJwtToken({ email, userId: id });

    res.status(201).json({
      token: accessToken,
      success: true,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
