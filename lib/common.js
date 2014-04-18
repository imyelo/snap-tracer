var mkdirp = require('mkdirp');
var rimraf = require('rimraf');
var path = require('path');
var dict = require('./dict');

exports.initDirectory = function () {
  console.log(dict.get('mainPath'));
  dict.get('dirs').forEach(function (dir) {
    mkdirp.sync(path.join(dict.get('mainPath'), dir));
  });
};

exports.cleanDirectory = function () {
  rimraf.sync(dict.get('mainPath'));
};