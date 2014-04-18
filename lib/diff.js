var fs = require('fs');
var path = require('path');
var PNGDiff = require('png-diff');
var EventProxy = require('eventproxy');
var dict = require('./dict');

var diff = function (callback) {
  var currents = fs.readdirSync(dict.get('currentPath'));
  var ep = new EventProxy();
  ep.after('diff', currents.length, function (list) {
    callback(list);
  });
  currents.forEach(function (filename) {
    var newer = path.join(dict.get('currentPath'), filename);
    var older = path.join(dict.get('referencePath'), filename);
    var output = path.join(dict.get('diffPath'), filename);
    if (fs.existsSync(output)) {
      fs.unlinkSync(output);
    }
    if (!fs.existsSync(older)) {
      console.warn('missing reference file: ' + filename);
      ep.emit('diff', {filename: filename, error: new Error('missing reference file')});
      return;
    }
    PNGDiff.outputDiff(newer, older, output, function(err, metric) {
      if (err) {
        console.log(filename + ': ' + err.message);
        return ep.emit('diff', {filename: filename, error: err});
      }
      if (metric !== 0) {
        console.log(filename + ': diff found!');
        ep.emit('diff', {filename: filename, difference: true});
      } else {
        console.log(filename + ': diff pass.');
        fs.unlink(output);
        ep.emit('diff', {filename: filename, difference: false});
      }
    });
  });
};

module.exports = diff;
