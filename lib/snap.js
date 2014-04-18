var _ = require('lodash');
var path = require('path');
var fs = require('fs');
var wd = require('wd');
var mkdirp = require('mkdirp');
var EventProxy = require('eventproxy');
var constant = require('./constant');

var log = function (browser, tasks, count) {
  console.log(browser + ': ' + count + '/' + tasks.length);
  if (count === tasks.length) {
    console.log(browser + ': done.');
  }
};

var shot = function (browser) {
  return function (name, url, isReference) {
    return function (callback) {
      var filename = browser + '-' + name + '.png';
      var target = path.join(constant.currentPath, filename);
      var driver = wd.remote();
      callback = _.once(callback);
      driver.init({browserName: browser}, function (err) {
        if (err) {
          return callback(err);
        }
        driver.get(url, function (err) {
          if (err) {
            return callback(err);
          }
          driver.saveScreenshot(target, function (err) {
            if (err) {
              return callback(err);
            }
            driver.quit();
            callback();
          });
        });
      });
    };
  };
};

var multi = function (browsers, tasks, callback) {
  var ep = new EventProxy();
  callback = _.once(callback);
  ep.after('shot', browsers.length * tasks.length, function () {
    callback();
  });
  ep.once('error', function (err) {
    console.error(err);
    callback(err);
  });

  browsers.forEach(function (browser) {
    var count = 0;
    log(browser, tasks, count);
    tasks.forEach(function (task) {
      shot(browser)(task.name, task.url)(function (err) {
        if (err) {
          return ep.emit('error', err);
        }
        ep.emit('shot');
        log(browser, tasks, ++count);
      });
    });
  });
};

module.exports = multi;
