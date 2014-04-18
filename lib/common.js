var mkdirp = require('mkdirp');
var path = require('path');
var constant = require('./constant');

exports.initDirectory = function () {
  constant.dirs.forEach(function (dir) {
    mkdirp(path.join(constant.mainPath, dir));
  });
};