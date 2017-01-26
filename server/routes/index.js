"use strict";

const authority = require('./authority');

module.exports = (app) => {
  app.get('/', (req, res) => {
    res.render('index');
  });

  const users = require('../controller/users');
  app.post('/regist', authority.uploadPhoto.single('photo'), users.regist);
  app.post('/login', users.login);
  app.get('/staffListQuery', users.staffList);

  const fileCloud = require('../controller/fileCloud');
  app.get('/fileCloudQuery', fileCloud.fileCloud);
  app.post('/addFile', fileCloud.addFile);

  app.get('*', (req, res) => {
    res.render('index');
  });
};