export interface UserRole {
  role: string;
  stationId: string;
}

import * as CurrentUserQuery from './CurrentUserQuery';
import * as LoginMutation from './LoginMutation';

export { LoginMutation, CurrentUserQuery };
