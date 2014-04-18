var path = require('path');
var fs = require('fs');
var rimraf = require('rimraf');
var mkdirp = require('mkdirp');
var constant = require('./constant');
var EventProxy = require('eventproxy');

var mainDir = constant.mainDir;
var dirs = constant.dirs;

var save = function (callback) {
  var sourcePath = constant.currentPath;
  var targetPath = constant.referencePath;
  var sources = fs.readdirSync(sourcePath);
  var ep = new EventProxy();
  if (sources.length === 0) {
    return callback(new Error('files not found'));
  }
  ep.after('save', sources.length, function () {
    callback();
  });
  rimraf.sync(targetPath);
  mkdirp.sync(targetPath);
  sources.forEach(function (file, index) {
    fs.rename(path.join(sourcePath, file), path.join(targetPath, file));
    ep.emit('save');
  });
};

module.exports = save;
