import { Container } from 'Common';
import { Loading } from 'Components';
import { ErrorHelper } from 'Error';
import { CurrentUserQuery } from 'RadioGraphql';
import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';

class UnAuthenticated extends React.Component<CoreProps> {
  public render() {
    const { children, redirect, disableLoading, history } = this.props;
    return (
      <CurrentUserQuery>
        {({ data, loading, error }) => {
          if (error) {
            const statusCode = ErrorHelper.extractStatusCode(error);
            if (statusCode && statusCode === 401) return children;
          }
          if (data && data.currentUser) {
            if (redirect) history.replace(redirect);
            return null;
          }
          if (loading) {
            if (disableLoading) return null;
            return <Loading fullScreen />;
          }

          return children;
        }}
      </CurrentUserQuery>
    );
  }
}

interface CoreProps extends RouteComponentProps<{}>, Props {}

const WithRouterUnAuthenticated = withRouter(UnAuthenticated);

export default WithRouterUnAuthenticated;

export interface Props extends Container {
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