import { Loading } from '@Components';
import { ErrorHelper } from '@Error';
import { CurrentUserQuery } from '@RadioGraphql';
import * as React from 'react';
import { useQuery } from 'react-apollo-hooks';
import { RouteComponentProps, withRouter } from 'react-router';

const UnAuthenticated: React.FunctionComponent<CoreProps> = props => {
  const { children, redirect, disableLoading, history } = props;
  const { data, loading, error } = useQuery(CurrentUserQuery.QUERY, { suspend: false });

  if (error) {
    const statusCode = ErrorHelper.extractStatusCode(error);
    if (statusCode && statusCode === 401) return <>{children}</>;
  }
  if (data && data.currentUser) {
    if (redirect) history.replace(redirect);
    return null;
  }
  if (loading) {
    if (disableLoading) return null;
    return <Loading fullScreen />;
  }

  return <>{children}</>;
};

interface CoreProps extends RouteComponentProps<{}>, Props {}

const WithRouterUnAuthenticated = withRouter(UnAuthenticated);

export default WithRouterUnAuthenticated;

export interface Props {
  redirect?: string;
  disableLoading?: boolean;
}

export function withUnAuthenticated<TProps>(redirect?: string) {
  return (Child: React.ComponentType<TProps>) => (props: TProps) => (
    <WithRouterUnAuthenticated redirect={redirect}>
      <Child {...props} />
    </WithRouterUnAuthenticated>
  );
}
