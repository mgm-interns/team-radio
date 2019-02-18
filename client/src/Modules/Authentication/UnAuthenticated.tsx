import { Loading } from '@Components';
import { ErrorHelper } from '@Error';
import { ToastContext, ToastDelay, ToastSeverity } from '@Modules';
import { CurrentUserQuery } from '@RadioGraphql';
import * as React from 'react';
import { useQuery } from 'react-apollo-hooks';
import { RouteComponentProps, withRouter } from 'react-router';

const UnAuthenticated: React.FunctionComponent<CoreProps> = props => {
  const { children, redirect, redirectMessage, disableLoading, history } = props;

  const toastContext = React.useContext(ToastContext);
  const { data, loading, error } = useQuery(CurrentUserQuery.QUERY, { suspend: false });

  React.useLayoutEffect(() => {
    if (data && data.currentUser) {
      if (redirect) {
        if (redirectMessage) {
          toastContext.add({ severity: ToastSeverity.ERROR, message: redirectMessage, delay: ToastDelay.LONG });
        }
        history.push(redirect);
      }
    }
  }, [data && data.currentUser]);

  if (data && data.currentUser) return null;

  if (error) {
    const statusCode = ErrorHelper.extractStatusCode(error);
    if (statusCode && statusCode === 401) return <>{children}</>;
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
  redirectMessage?: string;
  disableLoading?: boolean;
}

export function withUnAuthenticated<TProps>(redirect: string, message?: string) {
  return (Child: React.ComponentType<TProps>) => (props: TProps) => (
    <WithRouterUnAuthenticated redirect={redirect} redirectMessage={message}>
      <Child {...props} />
    </WithRouterUnAuthenticated>
  );
}

export function useUnAuthenticated(): boolean {
  const { error } = useQuery(CurrentUserQuery.QUERY, { suspend: false });
  if (error) return true;
  return false;
}
