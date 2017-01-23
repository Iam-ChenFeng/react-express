"use strict";

import React, { Component } from 'react';

import AsideNav from './common/AsideNav/index';
import CompanyNews from './common/CompanyNews/index';
import EmployeeBenefits from './common/EmployeeBenefits/index';

export default class Template extends Component {
  constructor (props) {
    super(props)
  }
  render () {
    return (
      <div>
        <AsideNav/>
        <div style={{
          position: 'relative',
          zIndex: '1',
          float: 'right',
          width: '340px',
          height: '100%',
          paddingLeft: '15px',
          paddingTop: '30px',
          background: '#fff',
        }}>
          <CompanyNews/>
          <EmployeeBenefits/>
        </div>
        <div style={{
          position: 'relative',
          height: '100%',
          padding: '0 340px 0 200px',
          background: 'rgba(0,0,0,.2)',
        }}>{this.props.children}</div>
      </div>
    )
  }
}