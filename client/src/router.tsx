import { Container } from 'Containers';
import { withAuthenticated, withUnAuthenticated } from 'Modules';
import { Home, Login, Profile, Register, Station } from 'Pages';
import * as React from 'react';
import { HashRouter, Redirect, Route, Switch } from 'react-router-dom';

export const AppRouter = () => {
  return (
    <HashRouter>
      <Switch>
        <Container>
          <Route exact path={'/'} component={Home} />
          <Route path={'/profile'} component={withAuthenticated('/')(Profile)} />
          <Route path={'/login'} component={withUnAuthenticated('/')(Login)} />
          <Route path={'/register'} component={withUnAuthenticated('/')(Register)} />
          <Route path={'/station/:stationId'} component={Station} />
        </Container>
      </Switch>
    </HashRouter>
  );
};
