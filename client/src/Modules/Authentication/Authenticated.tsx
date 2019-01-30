import { Container } from '@Common';
import { Loading } from '@Components';
import { CurrentUserQuery } from '@RadioGraphql';
import * as React from 'react';
import { useQuery } from 'react-apollo-hooks';
import { RouteComponentProps, withRouter } from 'react-router';

const Authenticated: React.FunctionComponent<CoreProps> = props => {
  const { render, children, redirect, disableLoading, history } = props;
  const { error, loading, data } = useQuery(CurrentUserQuery.QUERY, { suspend: false });

  if (error) {
    if (redirect) history.replace(redirect);
    return null;
  }
  if (loading) {
    if (disableLoading) return null;
    return <Loading fullScreen />;
  }

  if (render) {
    if (!data) return null;
    return render(data.currentUser);
  }

  return <>{children}</>;
};

interface CoreProps extends RouteComponentProps<{}>, Props {}

const WithRouterAuthenticated = withRouter(Authenticated);

export default WithRouterAuthenticated;

export interface Props extends Container {
  redirect?: string;
  disableLoading?: boolean;
  render?(user: CurrentUserQuery.User): React.ReactElement<{}>;
}

export function withAuthenticated<TProps>(redirect?: string) {
  return (Child: React.ComponentType<TProps>) => (props: TProps) => (
    <WithRouterAuthenticated redirect={redirect}>
      <Child {...props} />
    </WithRouterAuthenticated>
  );
}

export function useAuthenticated(): boolean {
  const { error, loading } = useQuery(CurrentUserQuery.QUERY, { suspend: false });
  if (error || loading) return false;
  return true;
}
