import React from 'react';
import { Switch, Route } from 'react-router-dom';

import LandingPage from '../Page/LandingPage/';
import Users from '../Page/Users';

export default () => (
  <Switch>
    <Route exact path="/" component={LandingPage} />
    <Route exact path="/users" component={Users} />
  </Switch>
);
