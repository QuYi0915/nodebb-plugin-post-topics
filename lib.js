"use strict";
//Main
var plugin = {},
  meta = module.parent.require('./meta');
var db = module.parent.require('./database');
var Topics = module.parent.require('./topics');
var translator = require.main.require('./public/src/modules/translator');

plugin.init = function (params, callback) {
  var app = params.router,
    middleware = params.middleware,
    controllers = params.controllers;

  app.get('/admin/plugins/post-topics', middleware.admin.buildHeader, renderAdmin);
  app.get('/api/admin/plugins/post-topics', renderAdmin);
  app.post('/api/admin/plugins/post-topics', function (req, res, next) {
    console.log(req.body);
    let {template = '', config = ''} = req.body;
    if (template === '' || config === '') {
      res.send({code: 1, msg: template ? '请填写标题' : '请填写模板'});
      return;
    }
    try {
      let configArr = JSON.parse(config);
      let pArr = [];

      function autoSend(title, content, index) {
        return new Promise((resolve, reject) => {
          Topics.post({
            uid: 1,
            cid: 1,
            title,
            content
          }).then(() => {
            console.log('第' + index + '条发送成功');
            resolve();
          }).catch((e) => {
            reject(e);
          });
        });
      }

      configArr.forEach((row, index) => {
        let {title, content} = row;
        let keys = Object.keys(content);
        keys.forEach((key) => {
          let reg = new RegExp(key, 'g');
          template = template.replace(reg, content[key]);
        });
        pArr.push(autoSend(title, template, index));
      });
      Promise.all(pArr).then(() => {
        res.send({code: 0});
      }).catch((e) => {
        res.send({code: 1, msg: e});
      });
    } catch (err) {
      console.log(err);
      res.send({code: 1, msg: '模板错误'});
    }

  });
  app.post('/api/admin/plugins/post-topics-one', function (req, res, next) {
    console.log(req.body);
    let {cid = '', title = '', content = ''} = req.body;
    if (cid === '') {
      res.send({code: 1, msg: '板块未设置'});
      return;
    }

    if (title === '') {
      res.send({code: 2, msg: '标题未设置'});
      return;
    }

    if (content === '') {
      res.send({code: 3, msg: '内容未设置'});
      return;
    }
    Topics.post({
      uid: 3,
      cid,
      title,
      content
    }).then(() => {
      res.send({code: 0, msg: '发送成功'});
    }).catch((e) => {
      console.log(e);
      res.send({code: 4, msg: e.toString()});
    });
  });
  callback();
};

plugin.addAdminNavigation = function (header, callback) {
  header.plugins.push({
    route: '/plugins/post-topics',
    icon: 'fa-tint',
    name: 'Post-Topics'
  });

  callback(null, header);
};

function renderAdmin(req, res, next) {
  res.render('admin/plugins/post-topics', {});
}

module.exports = plugin;
