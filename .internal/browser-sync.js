var Proxy = require('browser-sync');
var lodash = require('lodash');

var getPath = require('./read-file').getPath;

module.exports = function (options) {
  var _proxy = Proxy.create('common-js');
  var _shopUrl = '';
  var _options = {
    https: false,
    serveStatic: [ '.' ]
  }

  if (options.url) {
    _shopUrl = options.url;
  }
  else if (options.shop) {
    _shopUrl = options.shop + '.myinsales.ru';
  }

  _shopUrl += options['theme-id'] ? '?theme_preview=' + options['theme-id'] : '';

  lodash.merge(_options, { proxy: _shopUrl });

  _proxy.init(_options);

  return _proxy;
};
