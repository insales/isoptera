var proxy = require('browser-sync').create('common-js');
var common_reg = /https:\/\/assets3\.insales\.ru\/assets\/common-js\/common\.v2\.\d*\.\d*\.js/;

module.exports = function (options) {
  var shopUrl = '';

  if (options.url) {
    shopUrl = options.url;
  }
  else if (options.shop) {
    shopUrl = options.shop + '.myinsales.ru';
  }

  shopUrl += options['theme-id'] ? '?theme_preview=' + options['theme-id'] : '';

  if (options.mode == 'dist') {
    return false;
  }

  proxy.init({
    proxy: shopUrl,
    https: false,
    serveStatic: [ '.' ],
    plugins: [ 'bs-rewrite-rules' ],
    rewriteRules: [
      {
        match: common_reg,
        replace: '/' + options.config.dist
      }
    ]
  });

  return proxy;
};
