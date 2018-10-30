import { Container } from 'Common';
import { Loading } from 'Components';
import { CurrentUserQuery, CurrentUserQueryUser } from 'RadioGraphql';
import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';

class Authenticated extends React.Component<CoreProps> {
  public render() {
    const { render, children, redirect, disableLoading, history } = this.props;
    return (
      <CurrentUserQuery>
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
      </CurrentUserQuery>
    );
  }
}

interface CoreProps extends RouteComponentProps<{}>, Props {}

const WithRouterAuthenticated = withRouter(Authenticated);

export default WithRouterAuthenticated;

export interface Props extends Container {
  redirect?: string;
  disableLoading?: boolean;
  render?(user: CurrentUserQueryUser): React.ReactNode;
}

export function withAuthenticated<TProps>(redirect?: string) {
  return (Child: React.ComponentType<TProps>) => (props: TProps) => (
    <WithRouterAuthenticated redirect={redirect}>
      <Child {...props} />
    </WithRouterAuthenticated>
  );
}
