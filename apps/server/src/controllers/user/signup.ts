import { Request, Response } from "express";
import { User } from "../../models/User";
import bcrypt from "bcrypt";
import { generateJwtToken } from "../../utilities/auth";

type SignupInfo = {
    email: string,
    password: string,
}
export const signup = async (req: Request, res: Response): Promise<void> => {
    const data: SignupInfo = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(data.password, salt);

    const user = await User.create({
        email: data.email,
        password: hashedPassword,
        salt: salt
    })

    if (!user) {
        throw new Error("Unable to create user")
    }

    const email = "tush@gmail.com"; const id = "1234"

    const accessToken = generateJwtToken({ email, userId: id })

    res.json({
        token: accessToken,
        success: true,
        status: 200,
    })
}