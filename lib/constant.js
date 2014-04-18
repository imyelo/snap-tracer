var path = require('path');
var exports = {};
exports.mainDir = 'snaps';
exports.dirs = ['reference', 'current', 'diff'];
exports.mainPath = path.join(process.cwd(), exports.mainDir);
exports.currentPath = path.join(exports.mainPath, './current');
exports.referencePath = path.join(exports.mainPath, './reference');
exports.diffPath = path.join(exports.mainPath, './diff');

module.exports = exports;