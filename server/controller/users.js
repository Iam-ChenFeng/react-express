"use strict";

const User = require('../model/user');

exports.regist = regist;
exports.login = login;

function regist (req, res) {
  let body = req.body;
  let obj = Object.assign({}, body, {
    age: parseInt(body.age),
    sex: parseInt(body.sex),
    photo: req.file ? req.file.path.replace('dist', '') : '',
  });
  new User(obj)
    .save((err, data) => {
      if (err) {
        console.log(err)
      } else {
        console.log(data);
        res.redirect('/');
      }
    });
}

function login (req, res) {
  const body = req.body;
  User.findOne({name: body.name, password: body.password}, (err, data) => {
    if (err) {
      res.json({success: false})
    } else {
      console.log(data, 'server data');
      if (data) {
        res.json({success: true})
      } else {
        res.json({success: false})
      }
    }
  })
}