"use strict";

import React, { Component } from 'react';
import $ from 'jquery';

import s from './index.less';

class StaffInformation extends Component {
  constructor (props) {
    super(props);
  }
  render () {
    const curr = this.props.user;
    return (
      <tr>
        <td>{curr.name}</td>
        <td>{curr.age}</td>
        <td>{curr.sex}</td>
        <td>{curr.time.createTime}</td>
      </tr>
    )
  }
}

export default class StaffList extends Component {
  constructor (props) {
    super(props);
    this.state = {
      user: []
    }
  }
  componentDidMount () {
    this.queryUser(1);
  }
  render () {
    return (
      <div id={s.staffList}>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Sex</th>
              <th>time</th>
            </tr>
          </thead>
          <tbody>
            {this.state.user.map((curr) => {
              return <StaffInformation key={curr._id} user={curr}/>
            })}
          </tbody>
        </table>
      </div>
    )
  }
  queryUser (num, cb) {
    $.get('/staffListQuery?p=' + num)
      .then((data) => {
        this.setState({
          user: data
        })
      })
      .catch((error) => {
        console.log(error, 'error')
      })
  }
}