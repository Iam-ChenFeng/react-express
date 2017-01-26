"use strict";

import React, { Component } from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import Template from '../components/Template';
import Index from '../components/Index';
import Login from '../components/common/Login/index';
import Regist from '../components/common/Regist/index';
import StaffList from '../components/common/StaffList/index';
import FileCloud from '../components/common/FileCloud/index';

const RouteConfig = (
  <Router history={browserHistory}>
    <Route path="/" component={Template}>
      <IndexRoute component={Index}/>
      <Route path="/login" component={Login}/>
      <Route path="/regist" component={Regist}/>
      <Route path="/staffList" component={StaffList}/>
      <Route path="/fileCloud" component={FileCloud}>
        <Route path="*" component={FileCloud}/>
      </Route>
    </Route>
  </Router>
);

export default RouteConfig;