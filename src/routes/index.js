import React from 'react';
import { Switch } from 'react-router-dom';
import login from '../containers/login'
import register from '../containers/register';
import home from '../containers/home'
import Route from './Route'

export default function Routes() {
  return (
    <Switch>
      <Route path="/login" exact component={login} />
      <Route path="/" exact component={home} isPrivate />
      <Route path="/register" exact component={register} />
    </Switch>
  );
};
