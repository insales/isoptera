var Proxy = require('browser-sync');
var lodash = require('lodash');

module.exports = function (config) {
  var _proxy = Proxy.create('common-js');
  var _shopUrl = '';
  var _options = config.browserSync;

  if (config.url) {
    _shopUrl = config.url;
  }
  else if (config.shop) {
    _shopUrl = config.shop + '.myinsales.ru';
  }

  _shopUrl += config['theme-id'] ? '?theme_preview=' + config['theme-id'] : '';

  lodash.merge(_options, { proxy: _shopUrl });

  _proxy.init(_options);

  return _proxy;
};
