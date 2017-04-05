/** global  process */
var lodash = require('lodash');
var commandLine = require('command-line-args');
var readFile = require('./read-file').readFile;
var getPath = require('./read-file').getPath;

module.exports = function () {
  var _options = commandLine(require('../command-line-config'));
  var _config;

  if (!_options.config) {
    console.warn('set config file');
    process.exit();
  }

  _config = lodash.merge(_options, readFile(_options.config));
  _config.entry = getPath(_config.source);
  _config.dist = getPath(_config.dist);

  return _config;
};
