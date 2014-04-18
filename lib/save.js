var path = require('path');
var fs = require('fs');
var rimraf = require('rimraf');
var mkdirp = require('mkdirp');
var dict = require('./dict');
var EventProxy = require('eventproxy');

var mainDir = dict.get('mainDir');
var dirs = dict.get('dirs');

var save = function (callback) {
  var sourcePath = dict.get('currentPath');
  var targetPath = dict.get('referencePath');
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
