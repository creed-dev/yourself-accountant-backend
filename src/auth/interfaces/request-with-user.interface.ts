import Request from 'express';

export interface RequestWithUserInterface extends Request {
  user: { userId: number; email: string };
}
