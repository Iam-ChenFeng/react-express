"use strict";

import React, { Component } from 'react';
import { render } from 'react-dom';

import './public/css/reset.css';

import Test from './components/test/index';

render(
  <div>
    <Test />
  </div>,
  document.getElementById('root')
);