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
  lodash.forEach(config.bfPlugins, function (module) {
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

  lodash.forEach(config.bfTransforms, function (module) {
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

module.exports.init = function (config) {
  var _bundler = {};

  _bundler = browserify({
    entries: config.entry,
    cache: {},
    packageCache: {},
    paths: [ './source' ]
  });

  _bindPlugins(_bundler, config);
  _bindTransforms(_bundler, config);

  return _bundler;
};
