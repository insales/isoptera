var config = require('./.internal/config')();
var lodash = require('lodash');

var bundler = require('./.internal/browserify');
var Proxy = require('./.internal/browser-sync')
var bundle = bundler.init(config);
var _useProxy = lodash.get(config, 'browserSync', false);
var proxy;

if (_useProxy) {
  proxy = Proxy(config);
}

bundle
  .on('update', function () {
    bundler.rebundle(bundle, config, proxy);
  })
  .on('error', function () {
    // крашим процесс, если мы делаем сборку финальной версии
    if (!_useProxy) {
      process.exit(1);
    }
  });

bundler.rebundle(bundle, config, proxy);
