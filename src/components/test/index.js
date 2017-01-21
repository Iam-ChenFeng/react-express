"use strict";

import React, { Component } from 'react';

import s from './index.less';

export default class Text extends Component {
  constructor (props) {
    super(props)
  }
  render () {
    return (<div>
      <div className={s.style}>Test</div>
      <img src={require('./images/1.jpg')} alt=""/>
    </div>)
  }
}