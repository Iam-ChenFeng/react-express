"use strict";

import React, { Component } from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import Template from '../components/Template';
import Index from '../components/Index';
import Login from '../components/common/Login/index';
import Regist from '../components/common/Regist/index';

const RouteConfig = (
  <Router history={browserHistory}>
    <Route path="/" component={Template}>
      <IndexRoute component={Index}/>
      <Route path="/login" component={Login}/>
      <Route path="/regist" component={Regist}/>
    </Route>
  </Router>
);

export default RouteConfig;