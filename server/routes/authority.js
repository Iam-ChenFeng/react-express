"use strict";

const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'dist/images/')
  },
  filename: function (req, file, cb) {
    let str = 'abcdefghijklmnopqrstyvwxyz0123456789';
    let hash = '';
    for (let i=0;i<32;i++) {
      hash += str[Math.floor(Math.random() * str.length)];
    }
    cb(null, hash + '.' + file.mimetype.split('/')[1])
  }
});

function fileFilter(req, file, cb) {
  console.log(file, 'file1');
  if (/(jpeg|png|gif)$/g.test(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
}

exports.uploadPhoto = multer({ fileFilter : fileFilter , limits: {fileSize : 1024*1024} , storage: storage });