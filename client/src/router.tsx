import { Container } from 'Containers';
import { Home, Login, Profile, Register, Station } from 'Pages';
import * as React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';

export const AppRouter = () => {
  return (
    <HashRouter>
      <Switch>
        <Container>
          <Route exact path={'/'} component={Home} />
          <Route path={'/profile'} component={Profile} />
          <Route path={'/login'} component={Login} />
          <Route path={'/register'} component={Register} />
          <Route path={'/station/:stationId'} component={Station} />
        </Container>
      </Switch>
    </HashRouter>
  );
};
