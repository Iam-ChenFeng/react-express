"use strict";

import React, { Component } from 'react';
import $ from 'jquery';

import s from './index.less';

class User extends Component {
  constructor (props) {
    super(props);
  }
  render () {
    return (
      <div className="user">
        <div>{this.props.user.name}</div>
        <div>{this.props.user.age}</div>
        <div>{this.props.user.sex ? '男' : '女'}</div>
      </div>
    )
  }
}

class Logins extends Component {
  constructor (props) {
    super(props);
    this.state = {
      judgeName: true,
      judgePassword: true,
    }
  }
  render () {
    return (
      <div className="user">
        <div className="login">
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
    let self = this;
    $.ajax({
      url: '/login',
      type: 'POST',
      data: {
        name: this.nameNode.value,
        password: this.passwordNode.value,
      },
      success: function(data){
        if (!data.fail) {
          self.props.onLogin(data);
        }
      },
      error: function(error){
        console.log(error, 'error')
      }
    })
  }
}

export default class Login extends Component {
  constructor (props) {
    super(props);
    this.state = {
      login: false,
      user: {},
    }
  }
  render () {
    return (
      <div id={s.login}>
        <div className={s.layout}>
          {this.state.login ? <User user={this.state.user}/> : <Logins onLogin={(data) => {
            this.setState({
              login: true,
              user: data
            })
          }}/>}
        </div>
      </div>
    )
  }
}