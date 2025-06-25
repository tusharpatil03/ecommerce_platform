import 'express';

declare global {
  namespace Express {
    interface Request {
      session?: {
        userId: string;
        email: string;
        isAuth: boolean;
        expired: boolean;
      };
    }
  }
}

export {};
