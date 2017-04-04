var fileSystem = require('fs');

var browserify = require('browserify');
var lodash = require('lodash');

var getPath = require('./read-file').getPath;

/**
 * @description
 * Подключаем плагины
 *
 * @param {Object} bundler - ссылка на сборщик
 * @param {Object} config - настройки
 *
 * @return {Object} - пропатченный сборщик
 */
function _bindPlugins (bundler, config) {
  lodash.forEach(config.plugins, function (module) {
    var _path = getPath([ 'node_modules', module.name ]);
    bundler.plugin(require(_path), module.options);
  });

  return bundler;
}

/**
 * @description
 * Подключаем трансформы
 *
 * @param {Object} bundler - ссылка на сборщик
 * @param {Object} config - настройки
 *
 * @return {Object} - пропатченный сборщик
 */
function _bindTransforms (bundler, config) {

  lodash.forEach(config.transforms, function (module) {
    var _path = getPath([ 'node_modules', module.name ]);
    bundler.transform(require(_path), module.options);
  });

  return bundler;
}

module.exports.rebundle = function (bundle, config, proxy) {
  var bundleFs = fileSystem.createWriteStream(config.dist);

  bundle.bundle()
    .pipe(bundleFs);

  if (proxy) {
    proxy.reload();
  }

  return;
};

module.exports.init = function (options) {
  var _bundler = {};

  console.log('>>', process.env.CWD, process.env.PWD);

  _bundler = browserify({
    entries: options.entry,
    cache: {},
    packageCache: {},
    paths: [ './source' ]
  });

  _bindPlugins(_bundler, options.config);
  _bindTransforms(_bundler, options.config);

  return _bundler;
};
