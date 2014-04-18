var _ = require('lodash');
var debug = require('debug')('snap-tracer');
var common = require('./common');
var snap = require('./snap');
var save = require('./save');
var diff = require('./diff');

var exports = {};

var defaults = {
  "options": {
    "browsers": ["chrome", "firefox", "ie"]
  },
  "tasks": [
    {
      "url": "http://mail.163.com/",
      "name": "163"
    },
    {
      "url": "http://mail.qq.com/",
      "name": "qq"
    }
  ]
};

var config = {};

exports.config = function (c) {
  config = _.defaults({}, c, defaults);
};

exports.snap = function () {
  common.initDirectory();
  snap(config.options.browsers, config.tasks, function (err) {
    if (err) {
      console.error('snap fail.');
      return;
    }
    console.log('snap done.');
    exports.diff();
  });
};

exports.save = function () {
  save(function (err) {
    if (err) {
      return console.error(err);
    }
    console.log('done.');
  });
};

exports.diff = function () {
  diff(function (result) {
    console.log(result);
  });
};

module.exports = exports;
