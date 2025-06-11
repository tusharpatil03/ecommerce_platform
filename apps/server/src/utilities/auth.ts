import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../globals";

export interface JwtPayload {
  userId: string;
  email: string;
}
export const generateJwtToken = (payload: JwtPayload) => {
  const token = jwt.sign(
    {
      data: {
        email: payload.email,
        userId: payload.userId,
      },
    },
    JWT_SECRET as string,
    {
      expiresIn: "1d",
    },
  );
  return token;
};
