"use strict";

const FileCloud = require('../model/fileCloud');

exports.fileCloud = fileCloud;
exports.addFile = addFile;

class props {
  // 深度克隆 assign升级版
  copy (...args) {
    args.forEach((curr) => {
      if (!(curr instanceof Object)) {
        throw '不是对象！';
      }
    });

    function _copy(obj, to){
      for (let key of Object.keys(obj)) {
        // 判断是否需要复制到一个指定的对象
        if (to) {
          // 判断下是否需要深度复制
          if (typeof obj[key] == 'object') {
            // 判断下深度复制的时候指定对象是否是一个对象
            if (typeof to[key] == 'object') {
              to[key] = Object.assign(to[key], new _copy( obj[key] ));
            } else {
              to[key] = new _copy( obj[key] );
            }
          } else {
            to[key] = obj[key];
          }
        } else {
          // 返回一个copy对象
          this[key] = (typeof obj[key] == 'object') ? Object.assign(this[key], new _copy( obj[key] )) : obj[key];
        }
      }
    }

    // 循环复制
    for (let i = 1;i<args.length;i++) {
      _copy(args[i], args[0]);
    }

    return args[0];
    }

  // 转化路径为对象
  pathConversionObj (str) {
    let path = str.split('/');
    let i = 0;
    let obj = {};
    if (str == '') return obj;
    function setting (obj, fileName) {
      obj[fileName] = {};
      if (++i < path.length) {
        setting(obj[fileName], path[i])
      } else {
        obj[fileName] = 'dir';
      }
    }
    setting(obj, path[i]);
    return obj;
  }
}

function fileCloud (req, res) {
  const query = req.query.q;
  console.log(query, 'query');
  FileCloud
    .findOne({})
    .exec((err, data) => {
      if (err) {
        console.log(err);
        res.json({error: '文件获取失败！'});
      } else {
        let file = data.toObject().file;
        if (query == '' || query == '/' || query == 'null' || query == null) {
          // 如果获取的是跟目录 那么直接返回处理过后的对象
          changeObj(file);
          res.send(file);
        } else {
          // 拆分路径
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
              // 如果是文件夹 那么obj等于对象或者‘dir’ 那么返回处理后的对象
              // 否则则是字符串路径
              if (obj instanceof Object || obj === 'dir') {
                changeObj(obj);
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
    });
  // 处理对象 如果文件夹是对象则改成dir
  function changeObj (obj) {
    for (let [key, val] of Object.entries(obj)) {
      if (val instanceof Object) {
        obj[key] = 'dir';
      }
    }
  }
}

function addFile (req, res) {
  const body = req.body;
  console.log(body)
  FileCloud
    .findOne({})
    .exec((err, data) => {
      if (err) {
        console.log(err);
        res.json({error: '添加文件失败！'});
      } else {
        let file = data.toObject().file;
        let path = body.url.split('/');
        console.log(file, path);
        if (path.length < 20) {

        }

        // if (file[body.url][body.name]) {
        //   res.json({error: '文件名重复'});
        // } else {
        //   data
        //     .update({$set: {file: props.copy(file, {[body.url]: {[body.name]: 'dir'}})}}, (err) => {
        //       if (err) {
        //         console.log(err);
        //       } else {
        //         res.json({success: true});
        //       }
        //     })
        // }
      }
    });
}