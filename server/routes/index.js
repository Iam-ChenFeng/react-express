"use strict";

const authority = require('./authority');

module.exports = (app) => {
  app.get('/', (req, res) => {
    res.render('index');
  });

  const users = require('../controller/users');
  app.post('/regist', authority.uploadPhoto.single('photo'), users.regist);
  app.post('/login', users.login);

  app.get('*', (req, res) => {
    res.render('index');
  });
};