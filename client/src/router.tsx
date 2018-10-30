import { Container } from 'Containers';
import { withAuthenticated, withUnAuthenticated } from 'Modules';
import { HomePage, LoginPage, ProfilePage, RegisterPage, StationPage } from 'Pages';
import * as React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';

export const AppRouter = () => {
  return (
    <HashRouter>
      <Switch>
        <Container>
          <Route exact path={'/'} component={HomePage} />
          <Route path={'/profile'} component={withAuthenticated('/')(ProfilePage)} />
          <Route path={'/login'} component={withUnAuthenticated('/')(LoginPage)} />
          <Route path={'/register'} component={withUnAuthenticated('/')(RegisterPage)} />
          <Route path={'/station/:stationId'} component={StationPage} />
        </Container>
      </Switch>
    </HashRouter>
  );
};
