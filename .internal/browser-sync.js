var Proxy = require('browser-sync');
var lodash = require('lodash');

var getPath = require('./read-file').getPath;

function _bindPlugins (config) {
  var _pluginsConfig = {
    plugins: []
  };

  lodash.forEach(config.bsPlugins, function (plugin) {
    var _path = getPath([ 'node_modules', plugin.name ]);

    _pluginsConfig.plugins.push(_path);
    lodash.merge(_pluginsConfig, plugin.options);
  });

  return _pluginsConfig;
}

module.exports = function (config) {
  var _proxy = Proxy.create('common-js');
  var _shopUrl = '';
  var _options = {
    https: false,
    serveStatic: [ '.' ]
  };

  if (config.url) {
    _shopUrl = config.url;
  }
  else if (config.shop) {
    _shopUrl = config.shop + '.myinsales.ru';
  }

  _shopUrl += config['theme-id'] ? '?theme_preview=' + config['theme-id'] : '';

  lodash.merge(_options, { proxy: _shopUrl }, _bindPlugins(config));

  _proxy.init(_options);

  return _proxy;
};
