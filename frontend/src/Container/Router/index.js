import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import RouteWrapper from './Wrapper';
import routes from '../routes';

// wrap <Route> and use this everywhere instead, then when
// sub routes are added to any route it'll work
const Router = () => (
  <BrowserRouter>
    <Switch>
      {routes.map((route, i) => <RouteWrapper key={i} {...route} />)}
    </Switch>
  </BrowserRouter>
);

export default Router;
