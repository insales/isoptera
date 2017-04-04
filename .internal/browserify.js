var fileSystem = require('fs');

var browserify = require('browserify');
var lodash = require('lodash');

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
    bundler.plugin(require(module.name), module.options);
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
    bundler.transform(require(module.name), module.options);
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
