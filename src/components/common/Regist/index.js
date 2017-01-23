"use strict";

import React, { Component } from 'react';

import s from './index.less';

export default class Regist extends Component {
  constructor (props) {
    super(props);
    this.state = {
      name: '小伙子',
      password: 'cf',
      age: '20',
    }
  }
  render () {
    return (
      <div id={s.regist}>
        <form action="/regist" method="post" encType="multipart/form-data">
          <label htmlFor="registName"v>
            <span className={s.left}>员工姓名</span>
            <input name="name" id="registName" value={this.state.name} type="text" onChange={this.nameChange.bind(this)}/>
          </label>
          <label htmlFor="registPassword">
            <span className={s.left}>设置密码</span>
            <input name="password" id="registPassword" value={this.state.password} type="text" onChange={this.passwordChange.bind(this)}/>
          </label>
          <label htmlFor="registAge">
            <span className={s.left}>年龄</span>
            <input name="age" className={s.registAge} type="text" value={this.state.age} id="registAge" onChange={this.ageChange.bind(this)}/>
            岁
          </label>
          <div className={s.sex}>
            <span className={s.left}>性别:</span>
            <label htmlFor="registSexNan">
              <input name="sex" type="radio" checked value='1'/>
              男
            </label>
            <label htmlFor="registSexNu">
              <input name="sex" type="radio" value='2'/>
              女
            </label>
          </div>
          <div className={s.photo}>
            <span className={s.left}>头像照片</span>
            <label htmlFor="registPhoto">upload</label>
            <input name="photo" id="registPhoto" type="file"/>
          </div>
          <button>Submit</button>
        </form>
      </div>
    )
  }
  nameChange (e) {
    this.setState({
      name: e.target.value
    })
  }
  passwordChange () {

  }
  ageChange () {

  }
}