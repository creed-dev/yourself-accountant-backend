import Request from 'express';
import { User } from '../database/entities/user';

export interface RequestWithUser extends Request {
  user: User;
}
