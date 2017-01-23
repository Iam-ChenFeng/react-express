"use strict";

import React, { Component } from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import route from './config/route';
import store from './reducer/index';

import './public/css/reset.css';

render(
  <Provider store={store}>
    {route}
  </Provider>,
  document.getElementById('root')
);