"use strict";

import React, { Component } from 'react';

import s from './index.less';

export default class CompanyNews extends Component {
  constructor (props) {
    super(props)
  }
  render () {
    return (
      <div id={s.companyNews}>
        <h2>公司动态</h2>
        <hr/>
        <ul>
          <li>Create a services site <time>2016-09-01</time></li>
          <li>Solve initial network problems <time>2016-10-02</time></li>
          <li>Technical testing <time>2016-10-26</time></li>
          <li>Network problems being solved <time>2015-11-17</time></li>
        </ul>
      </div>
    )
  }
}