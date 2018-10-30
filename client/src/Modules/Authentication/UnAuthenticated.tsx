import { Container } from 'Common';
import { Loading } from 'Components';
import { CurrentUserQuery } from 'RadioGraphql';
import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';

class CoreUnAuthenticated extends React.Component<CoreUnAuthenticated.Props> {
  public render() {
    const { children, redirect, disableLoading, history } = this.props;
    return (
      <CurrentUserQuery>
        {({ data, loading }) => {
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

namespace CoreUnAuthenticated {
  export interface Props extends RouteComponentProps<{}>, UnAuthenticated.Props {}
}

export const UnAuthenticated = withRouter(CoreUnAuthenticated);

namespace UnAuthenticated {
  export interface Props extends Container {
    redirect?: string;
    disableLoading?: boolean;
  }
}

export function withUnAuthenticated<TProps>(redirect?: string) {
  return (Child: React.ComponentType<TProps>) => (props: TProps) => (
    <UnAuthenticated redirect={redirect}>
      <Child {...props} />
    </UnAuthenticated>
  );
}
