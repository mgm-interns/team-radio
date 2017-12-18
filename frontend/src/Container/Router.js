import React from 'react';
import { Switch, Route } from 'react-router-dom';

import LandingPage from '../Page/LandingPage/';
import Landing from '../Page/Landing/';

export default () => (
  <Switch>
    <Route exact path="/" component={Landing} />
  </Switch>
);
