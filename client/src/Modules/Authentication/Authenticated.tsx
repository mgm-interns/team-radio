import { Container } from '@Common';
import { Loading } from '@Components';
import { ToastContext, ToastDelay, ToastSeverity } from '@Modules';
import { CurrentUserQuery } from '@RadioGraphql';
import * as React from 'react';
import { useQuery } from 'react-apollo-hooks';
import { RouteComponentProps, withRouter } from 'react-router';

const Authenticated: React.FunctionComponent<CoreProps> = props => {
  const { render, children, redirect, redirectMessage, disableLoading, history } = props;

  const toastContext = React.useContext(ToastContext);
  const { error, loading, data } = useQuery(CurrentUserQuery.QUERY, { suspend: false });

  React.useLayoutEffect(() => {
    if (error) {
      if (redirect) {
        if (redirectMessage) {
          toastContext.add({ severity: ToastSeverity.ERROR, message: redirectMessage, delay: ToastDelay.LONG });
        }
        history.push(redirect);
      }
    }
  }, [error]);

  if (error) return null;

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
  redirectMessage?: string;
  disableLoading?: boolean;
  render?(user: CurrentUserQuery.User): React.ReactElement<{}>;
}

export function withAuthenticated<TProps>(redirect: string, message?: string) {
  return (Child: React.ComponentType<TProps>) => (props: TProps) => (
    <WithRouterAuthenticated redirect={redirect} redirectMessage={message}>
      <Child {...props} />
    </WithRouterAuthenticated>
  );
}

export function useAuthenticated(): boolean {
  const { error, loading } = useQuery(CurrentUserQuery.QUERY, { suspend: false });
  if (error || loading) return false;
  return true;
}
