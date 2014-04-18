var path = require('path');
var dict = {};
var update;
dict.outputDir = '.';
dict.mainDir = 'snaps';
dict.dirs = ['reference', 'current', 'diff'];
update = function () {
  dict.mainPath = path.join(process.cwd(), dict.outputDir, dict.mainDir);
  dict.currentPath = path.join(dict.mainPath, './current');
  dict.referencePath = path.join(dict.mainPath, './reference');
  dict.diffPath = path.join(dict.mainPath, './diff');
};
update();

exports.get = function (key) {
  return dict[key];
};

exports.set = function (key, value) {
  dict[key] = value;
  update();
};
