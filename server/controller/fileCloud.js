"use strict";

const FileCloud = require('../model/fileCloud');

exports.fileCloud = fileCloud;
exports.addFile = addFile;

function fileCloud (req, res) {
  const query = req.query.q;
  console.log(query, 'query');
  FileCloud.findOne({}).exec((err, data) => {
    if (err) {
      console.log(err)
    } else {
      let file = data.toObject().file;
      if (query == '' || query == '/' || query == 'null' || query == null) {
        for (let [key, val] of Object.entries(file)) {
          if (val === 'dir' || val instanceof Object) {
            file[key] = '';
          }
        }
        res.send(file);
      } else {
        let path = query.split('/');
        if (path.length < 20) {
          try {
            let obj = file[path[0]];
            let num = 1;
            if (path.length >= 1) {
              while (path.length - num >= 1) {
                obj = obj[path[num]];
                num++;
              }
            }
            // 如果是文件夹 那么obj等于对象  否则则是字符串路径
            if (obj instanceof Object) {
              for (let [key, val] of Object.entries(obj)) {
                if (val === 'dir' || val instanceof Object) {
                  obj[key] = '';
                }
              }
              res.send(obj);
            } else {
              // 如果是静态静态资源文件
              // res.redirect('');
            }
          } catch (e) {
            return res.send({error: '文件路径错误'});
          }
        } else {
          return res.send({error: '查询条件太深'});
        }
      }
    }
  })
}

function addFile (req, res) {
  const body = req.body;
  FileCloud.findOne({}).exec((err, data) => {
    if (err) {
      console.log(err);
    } else {
      let file = data.toObject().file;
      if (file[body.name]) {
        res.json({error: '文件名重复'});
      } else {
        data
          .update({$set: {file: Object.assign(file, {'垃圾伙': {a: 'urlxxxxx', b:'urlxxxx', c: {d: 'dir'}}})}}, (err) => {
            if (err) {
              console.log(err);
            } else {
              res.json({success: true});
            }
          })
      }
    }
  });

  // new FileCloud({
  //   file: {
  //     '新建文件夹2': {
  //       '啦啦啦': 'url:xxxxxx'
  //     }
  //   }
  // }).save((err, data) => {
  //   if (err) {
  //     console.log(err);
  //   } else {
  //     console.log(data);
  //     res.send();
  //   }
  // });
}