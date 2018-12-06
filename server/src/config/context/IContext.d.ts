import { User } from 'entities';
import { AnonymousUser, RealTimeStationManager } from 'subscription';

export interface IdentifiableUser {
  isUser(): boolean;
  isAnonymous(): boolean;
}

export interface IContext {
  user: User | AnonymousUser | undefined;
  currentStation: RealTimeStationManager | undefined;

  setUserFromTokens(tokens: Tokens): void;
  toObject(): object;
}

export interface IAuthenticatedContext extends IContext {
  user: User;
}

export interface IAnonymousContext extends IContext {
  user: AnonymousUser;
}

export interface Tokens {
  token?: string;
  refreshToken?: string;
  byPassToken?: string;
  clientId?: string;
}
