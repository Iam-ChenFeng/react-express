"use strict";

const User = require('../model/user');

exports.regist = regist;
exports.login = login;
exports.staffList = staffList;

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
  User
    .findOne({name: body.name, password: body.password}, {name: 1, age:1, sex: 1, photo: 1})
    .exec((err, data) => {
      if (err) {
        res.json({fail: true})
      } else {
        if (data) {
          res.json(data);
        } else {
          res.json({fail: true})
        }
      }
    })
}

function staffList (req, res) {
  let p = req.query.p;
  User
    .find({}, {name: 1, age: 1, sex: 1, time: 1})
    .skip((p-1) * 10)
    .limit(10)
    .exec((err, data) => {
      if (err) {
        console.log(err);
      } else {
        res.send(data);
      }
    })
}