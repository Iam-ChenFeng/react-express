"use strict";

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
import $ from 'jquery';

import s from './index.less';

export default class Text extends Component {
  constructor (props) {
    super(props)
  }
  render () {
    return (
      <div id={s.asideNav}>
        <h1><Link to="/">Xiao Huo Zi</Link></h1>
        <dl ref='asideNav'>
          <dt className={s.selected}>管理登入</dt>
          <dd>
            <Link to="/login">登入界面</Link>
            <Link to="/regist">注册管理</Link>
          </dd>
          <dt>公司人员信息</dt>
          <dd>
            <Link>人员列表</Link>
          </dd>
          <dt>公司文件</dt>
          <dd>
            <Link>文件列表</Link>
          </dd>
          <dt>公司财务信息</dt>
          <dd>
            <Link>支出</Link>
            <Link>收入</Link>
            <Link>收益线型图</Link>
          </dd>
        </dl>
      </div>
    )
  }
  componentDidMount () {
    let $asideNav = $(ReactDOM.findDOMNode(this.refs.asideNav));
    let $dt = $asideNav.find('dt');
    $dt.on('click', function(){
      $(this).next().toggle(300);
    });

    let $a = $asideNav.find('a');
    $a.on('click', function(){
      $a.not($(this).addClass(s.selected)).removeClass(s.selected);
    });
  }
}