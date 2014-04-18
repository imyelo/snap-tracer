var _ = require('lodash');
var opn = require('opn');
var debug = require('debug')('snap-tracer');
var constant = require('./constant');
var common = require('./common');
var snap = require('./snap');
var save = require('./save');
var diff = require('./diff');

var exports = {};

var defaults = {
  "options": {
    "browsers": ["chrome"]
  },
  "tasks": [
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
  common.initDirectory();
  diff(function (result) {
    var diffs;
    console.log(result);
    diffs = result.filter(function (data) {
      return data.difference;
    });
    errs = result.filter(function (data) {
      return data.error;
    });
    if (errs.length > 0) {
      console.log(errs.length + ' error found:');
      errs.forEach(function (e) {
        console.log('  - ' + e.filename, e.error);
      });
    }
    if (diffs.length > 0) {
      console.log(diffs.length + ' diff found:');
      diffs.forEach(function (d) {
        console.log('  - ' + d.filename);
      });
      opn(constant.diffPath);
    }
    if (errs.length === 0 && diffs.length === 0) {
      console.log('all pass');
    }
  });
};

exports.clean = function () {
  common.cleanDirectory();
  console.log('clean.');
};

module.exports = exports;
