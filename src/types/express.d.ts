import {} from 'express';

declare global {
  namespace Express {
    interface Request {
      user?: {
        email: string;
        role: string;
        userId: string;
      };
    }
  }
}
