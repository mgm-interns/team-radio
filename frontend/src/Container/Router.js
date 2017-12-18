import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Landing from '../Page/Landing/';
import Users from '../Page/Users';

export default () => (
  <Switch>
    <Route exact path="/" component={Landing} />
    <Route exact path="/users" component={Users} />
  </Switch>
);
