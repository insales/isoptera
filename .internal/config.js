/** global  process */
var commandLine = require('command-line-args');
var readFile = require('./read-file').readFile;
var getPath = require('./read-file').getPath;

module.exports = function () {
  var options = commandLine(require('../command-line-config'));

  if (!options.config) {
    console.warn('set config file');
    process.exit();
  }

  options.config = readFile(options.config);
  options.entry = getPath(options.config.source);
  options.dist = getPath(options.config.dist);

  options.useProxy = !!options.config.proxy;

  return options;
};
