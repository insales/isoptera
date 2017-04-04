var path = require('path');
var lodash = require('lodash');

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

  _path = lodash.chain(parts)
    .castArray()
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

module.exports = {
  readFile: readFile,
  getPath: getPath
};
