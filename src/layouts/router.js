import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import login from './../containers/login'
import newLogin from './../containers/newLogin';


function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" exact component={login} />
        <Route path="/register" component={newLogin} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
