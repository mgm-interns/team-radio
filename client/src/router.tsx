import { Container, FullLayout } from 'Containers';
import { Station, Home, Profile, Login, Register } from 'Pages';
import * as React from 'react';
import { Route, HashRouter, Switch } from 'react-router-dom';

export const AppRouter = () => {
  return (
    <HashRouter>
      <Switch>
        <Container>
          <FullLayout>
            <Route exact path={'/'} component={Home} />
            <Route path={'/station/:stationId'} component={Station} />
            <Route path={'/profile'} component={Profile} />
            <Route path={'/login'} component={Login} />
            <Route path={'/register'} component={Register} />
          </FullLayout>
        </Container>
      </Switch>
    </HashRouter>
  );
};
