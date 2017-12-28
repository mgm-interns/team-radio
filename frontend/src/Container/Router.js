import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Landing from '../Page/Landing';
import Station from '../Page/Station';
import Auth from '../Page/Auth/';
import Login from '../Page/Auth/Login/';
import Register from '../Page/Auth/Register/';
import ImageCropper from '../Page/Demo/ImageCropper';

// then our route config
const routes = [
  {
    path: '/',
    component: Landing,
    exact: true,
  },
  {
    path: '/station/:station_name?',
    component: Station,
  },
  {
    path: '/auth',
    component: Auth,
    routes: [
      {
        path: '/auth/login',
        component: Login,
      },
      {
        path: '/auth/register',
        component: Register,
      },
    ],
  },
  {
    path: '/demo/image-cropper',
    component: ImageCropper,
  },
];

// wrap <Route> and use this everywhere instead, then when
// sub routes are added to any route it'll work
const RouteWithSubRoutes = route => (
  <Route
    path={route.path}
    render={props => (
      // pass the sub-routes down to keep nesting
      <route.component {...props} routes={route.routes} />
    )}
  />
);

const Router = () => (
  <BrowserRouter>
    <Switch>
      {routes.map((route, i) => <RouteWithSubRoutes key={i} {...route} />)}
    </Switch>
  </BrowserRouter>
);

export default Router;
