import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Landing from '../Page/Landing/';
import Station from '../Page/Station/';
import Player from '../Page/test';

export default () => (
  <Switch>
    <Route exact path="/" component={Landing} />
    <Route exact path="/station" component={Station} />
    <Route exact path="/test" component={Player} />
  </Switch>
);
