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
  app.get('/api/admin/plugins/post-topics', function (req, res, next) {
    console.log(req.body);
    Topics.post({
      uid: 1,
      cid: 1,
      title: '111111111Welcome to your NodeBB!',
      content: '222222222222222',
    }).then(() => {
      console.log(456);
    }).catch((e) => {
      console.log(e);
    });
    res.send({dataURL: '123123'});
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