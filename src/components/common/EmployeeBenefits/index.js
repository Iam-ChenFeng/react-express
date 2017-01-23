"use strict";

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

import s from './index.less';

export default class EmployeeBenefits extends Component {
  constructor (props) {
    super(props);
    this.state = {
      imgBoxOffice: 0
    }
  }
  render () {
    return (
      <div id={s.employeeBenefits}>
        <h2>员工福利</h2>
        <hr/>
        <div ref='banner' className={s.banner}>
          <div className={s.imgBox} style={{
            transform: `translateX(${this.state.imgBoxOffice}px)`,
          }}>
            <img src={require('./images/1.jpg')} alt=""/>
            <img src={require('./images/2.jpg')} alt=""/>
            <img src={require('./images/3.jpg')} alt=""/>
            <img src={require('./images/4.jpg')} alt=""/>
          </div>
          <div className={s.imgBtn}>
            <span className={s.selection}></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    )
  }
  componentDidMount () {
    let self = this;
    let $banner = $(ReactDOM.findDOMNode(this.refs.banner));
    let $btn = $banner.find(`.${s.imgBtn} span`);
    $btn.on('click', function(){
      $btn.not($(this).addClass(s.selection)).removeClass(s.selection);
      self.setState({
        imgBoxOffice: -$(this).index() * 320,
      });
    });
  }
}