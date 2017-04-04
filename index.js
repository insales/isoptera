var config = require('./.internal/config')();

var bundler = require('./.internal/browserify');
var Proxy = require('./.internal/browser-sync')
var bundle = bundler.init(config);
var proxy;

if (config.useProxy) {
  proxy = Proxy(config);
}

bundle
  .on('update', function () {
    bundler.rebundle(bundle, config, proxy);
  })
  .on('error', function () {
    // крашим процесс, если мы делаем сборку финальной версии
    if (!config.useProxy) {
      process.exit(1);
    }
  });

bundler.rebundle(bundle, config, proxy);
