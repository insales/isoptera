var proxy = require('browser-sync').create('common-js');

module.exports = function (options) {
  var shopUrl = '';

  if (options.url) {
    shopUrl = options.url;
  }
  else if (options.shop) {
    shopUrl = options.shop + '.myinsales.ru';
  }

  shopUrl += options['theme-id'] ? '?theme_preview=' + options['theme-id'] : '';

  proxy.init({
    proxy: shopUrl,
    https: false,
    serveStatic: [ '.' ]
  });

  return proxy;
};
