import { User } from 'entities';

export interface IContext {
  user: User | undefined;
}

export interface IAuthenticatedContext {
  user: User;
}
