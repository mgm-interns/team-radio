import React from 'react';
import { Switch, Route } from 'react-router-dom';

import LandingPage from '../Page/LandingPage/';
import Station from '../Page/Station/';

export default () => (
  <Switch>
    <Route exact path="/" component={LandingPage} />
    <Route exact path="/station" component={Station} />
  </Switch>
);
