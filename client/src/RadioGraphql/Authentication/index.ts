export interface UserRole {
  role: string;
  stationId: string;
}

export {
  default as LoginMutation,
  Props as LoginMutationProps,
  Variables as LoginMutationVariables,
  Response as LoginMutationResponse,
  withHOC as withLoginMutation,
  WithHOCProps as WithLoginMutationProps
} from './LoginMutation';

export {
  default as CurrentUserQuery,
  Props as CurrentUserQueryProps,
  Variables as CurrentUserQueryVariables,
  Response as CurrentUserQueryResponse,
  withHOC as withCurrentUserQuery,
  WithHOCProps as WithCurrentUserQueryProps,
  User as CurrentUserQueryUser
} from './CurrentUserQuery';
