import { HomePage, LoginPage, ProfilePage, RegisterPage, StationPage } from '@Pages';
import * as React from 'react';
import { HashRouter, Redirect, Route, Switch } from 'react-router-dom';

export const AppRouter = () => {
  return (
    <HashRouter>
      <Switch>
        <Route exact path={'/'} component={HomePage} />
        <Route path={'/profile/:tab?'} component={ProfilePage} />
        <Route path={'/u/:userId/:tab?'} component={ProfilePage} />
        <Route path={'/login'} component={LoginPage} />
        <Route path={'/register'} component={RegisterPage} />
        <Route path={'/station/:stationId/:tab?'} component={StationPage} />
        <Redirect to={'/'} />
      </Switch>
    </HashRouter>
  );
};
