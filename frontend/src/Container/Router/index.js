import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import RouteWrapper from './Wrapper';
import routes from '../routes';

// wrap <Route> and use this everywhere instead, then when
// sub routes are added to any route it'll work

/* eslint-disable react/prop-types */
const Router = ({ scrollbarRef }) => (
  <BrowserRouter>
    <Switch>
      {routes.map((route, i) => (
        <RouteWrapper key={i} {...route} scrollbarRef={scrollbarRef} />
      ))}
    </Switch>
  </BrowserRouter>
);

export default Router;
