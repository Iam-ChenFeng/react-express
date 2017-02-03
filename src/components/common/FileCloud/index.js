"use strict";

import React, { Component } from 'react';
import { Link } from 'react-router';
import $ from 'jquery';

import s from './index.less';

export default class FileCloud extends Component {
  constructor (props) {
    super(props);
    this.state = {
      // 查看点击的是什么地址
      url: this.props.params.splat ? this.props.params.splat : '',
      // 判断右击该显示是文件夹选项还是总选项
      judgmentRightClick: true,
      // 文件数据
      fileCloud: {},
      // 文件数据显示
      fileCloudDom: [],
    }
  }
  // props将要更新
  componentWillReceiveProps (nextProps) {
    // 获取更新的地址
    let url = nextProps.params.splat ? nextProps.params.splat : '';
    // 设置地址
    this.setState({
      url: url,
    });
    // 查询后台
    this.fileCloudQuery(url || '/');
  }
  componentWillMount () {
    // 页面初始化查询数据
    this.fileCloudQuery();
  }
  componentDidMount () {
    // 点击页面隐藏右击菜单
    document.onclick = () => {
      this.rightClickMenu.style.display = 'none';
    };
    document.oncontextmenu = function(){
      return false;
    };
  }
  componentWillUnmount () {
    document.onclick = null;
    document.oncontextmenu = null;
  }
  render () {
    return (
      <div id={s.fileCloud}>
        <div className={s.position}>
          <Link to="/fileCloud">
            Home
          </Link>
          {this.position()}
        </div>
        <div id={s.file} onContextMenu={this.rightClickMenuShow.bind(this)}>
          {this.state.fileCloudDom}
        </div>
        <div id={s.rightClickMenu} ref={(e) => {this.rightClickMenu = e}}>
          <div onClick={this.addFile.bind(this)}>新建文件夹</div>
          <wrap style={{'display': this.state.judgmentRightClick ? 'none' : 'block',}}>
            <div>重命名</div>
            <div>删除</div>
            <div>复制</div>
            <div>剪切</div>
          </wrap>
          <div style={{'display': this.state.judgmentRightClick ? 'block' : 'none',}}>黏贴</div>
        </div>
      </div>
    )
  }
  // 更改头部目录路径
  position () {
    if (this.state.url) {
      let root = '/fileCloud/';
      let url = this.state.url;
      let positionArr = [];
      url.split('/').forEach((curr, i) => {
        root += curr + '/';
        positionArr.push(
          <Link key={i} to={root}>
            {curr}
          </Link>
        )
      });
      return positionArr;
    }
  }
  // 查询文件夹
  fileCloudQuery (url) {
    $.get(`/fileCloudQuery?q=${url || this.state.url}`)
      .then((data) => {
        if (data.error) {
          alert(data.error);
        } else {
          let file = [];
          console.log(data);
          if (data instanceof Object) {
            for (let [key, val] of Object.entries(data)) {
              file.push(
                <Link key={key}
                      to={`/fileCloud/${this.state.url == '' ? '' : this.state.url + '/'}${key}`}
                      target={val == 'dir' ? '' : '_blank'}>
                  {val == 'dir' ? <i className="iconfont">&#xe8ea;</i> : <i className="iconfont">&#xe798;</i>}
                  <div>{key}</div>
                </Link>
              )
            }
            this.setState({
              fileCloud: data,
              fileCloudDom: file,
            })
          } else {
            this.setState({
              fileCloud: {},
              fileCloudDom: [],
            })
          }
        }
      }).catch((err) => {
        console.log(err);
      })
  }
  // 添加文件夹
  addFile () {
    let self = this;
    let i = '';
    // 创建文件名
    function createFileName () {
      let fileName = '新建文件夹';
      fileName += i;
      // 判断文件名是否重复
      if (fileName in self.state.fileCloud) {
        // 重复的时候序列号加一 之后重新调用 createFileName
        i++;
        createFileName();
      } else {
        if (i == '') {i = !!i}
        $.post('/addFile', {'name': fileName, url: self.state.url})
          .then((data) => {
            if (!data.error) {
              self.fileCloudQuery();
            }
          }).catch((err) => {
            console.log(err);
          })
      }
    }
    createFileName();
  }
  // 右击显示菜单
  rightClickMenuShow (e) {
    let target =  e.target;
    if (target.id === s.file) {
      this.setState({
        judgmentRightClick: true,
      })
    } else {
      this.setState({
        judgmentRightClick: false,
      })
    }
    this.rightClickMenu.style.cssText = `display:block;left:${e.clientX}px;top:${e.clientY}px`;
  }
}