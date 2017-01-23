"use strict";

import React, { Component } from 'react';
import $ from 'jquery';

import s from './index.less';

export default class Login extends Component {
  constructor (props) {
    super(props);
    this.state = {
      judgeName: true,
      judgePassword: true,
    }
  }
  render () {
    return (
      <div id={s.login}>
        <div className={s.layout}>
          <input ref={n => {this.nameNode = n}} value="小伙子" type="text" placeholder="用户名" onBlur={this.judgeName.bind(this)}/>
          <div className={s.prompt} style={{
            visibility: this.state.judgeName === true ? 'hidden' : 'visible'
          }}>请输入正确的名字</div>
          <input ref={n => {this.passwordNode = n}} value='cf' type="password" placeholder="密码"/>
          <div style={{
            display: 'none'
          }}>密码格式不正确</div>
          <label htmlFor="remember">
            <input id="remember" type="checkbox"/>
            <span>记住我</span>
          </label>
          <button onClick={this.login.bind(this)}>Submit</button>
        </div>
      </div>
    )
  }
  judgeName (e) {
    this.setState({
      judgeName: e.target.value.trim() != '' ? true : false,
    });
  }
  login () {
    $.ajax({
      url: '/login',
      type: 'POST',
      data: {
        name: this.nameNode.value,
        password: this.passwordNode.value,
      },
      //必须false才会自动加上正确的Content-Type
      // contentType: false,
      //必须false才会避开jQuery对 formdata 的默认处理
      //XMLHttpRequest会对 formdata 进行正确的处理
      // processData: false,
      success: function(data){
        console.log(data, 'success')
      },
      error: function(error){
        console.log(error, 'error')
      }
    })
  }
}