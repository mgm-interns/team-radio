import { Container } from 'Common';
import { Loading } from 'Components';
import { CurrentUserQuery } from 'RadioGraphql';
import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';

class CoreAuthenticated extends React.Component<CoreAuthenticated.Props> {
  public render() {
    const { render, children, redirect, disableLoading, history } = this.props;
    return (
      <CurrentUserQuery.Query query={CurrentUserQuery.QUERY}>
        {({ error, loading, data }) => {
          if (error) {
            if (redirect) history.replace(redirect);
            return null;
          }
          if (loading) {
            if (disableLoading) return null;
            return <Loading fullScreen />;
          }

          if (render) {
            return render(data.currentUser);
          }
          return children;
        }}
      </CurrentUserQuery.Query>
    );
  }
}

namespace CoreAuthenticated {
  export interface Props extends RouteComponentProps<{}>, Authenticated.Props {}
}

export const Authenticated = withRouter(CoreAuthenticated);

namespace Authenticated {
  export interface Props extends Container {
    redirect?: string;
    disableLoading?: boolean;
    render?(user: CurrentUserQuery.User): React.ReactNode;
  }
}

export function withAuthenticated<TProps>(redirect?: string) {
  return (Child: React.ComponentType<TProps>) => (props: TProps) => (
    <Authenticated redirect={redirect}>
      <Child {...props} />
    </Authenticated>
  );
}
