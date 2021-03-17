import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import login from './../containers/login'
import newLogin from './../containers/newLogin';
import home from './../containers/home'
import trade from './../containers/trade'

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" exact component={login} />
        <Route path="/trade" component={trade} />
        <Route path="/home" component={home} />
        <Route path="/register" component={newLogin} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
