/** global  process */
var path = require('path');
var lodash = require('lodash');
var commandLine = require('command-line-args');

/**
 * @description
 * Собираем массив для создания путей относительно корня.
 *
 * @param {Array|String} parts - массив или строка с путем к файлу
 *
 * @return {Array} - массив с фрагментами пути
 */
function getPath (parts) {
  var _path = '';
  var _parts = [ parts ];

  _path = lodash.chain(_parts)
    .reduce(function (result, part) {
      return path.join(result, part);
    }, process.env.PWD)
    .value();

  return _path;
}

/**
 * @description
 *
 * @param {String} filePath - строка с путем к файлу
 *
 * @return {Object} - содержимое файла
 */
function readFile (filePath) {
  var _path = getPath(filePath);
  var _file = null;

  try {
    _file = require(_path);
  }
  catch (err) {
    console.warn('no config file: ', _path);
    process.exit();
  }

  return _file;
}

module.exports = function () {
  var options = commandLine(readFile('command-line-config'));

  if (!options.config) {
    console.warn('set config file');
    process.exit();
  }

  options.config = readFile(options.config);
  options.entry = getPath(options.config.source);
  options.dist = getPath(options.config.dist);

  return options;
};
