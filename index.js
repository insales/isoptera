var config = require('.internal/config')();

var bundler = require('.internal/browserify');
var proxy = null;
var bundle = bundler.init(config);


if (config.proxy) {
  proxy = require('.internal/browser-sync')(config);
}

bundle
  .on('update', function () {
    bundler.rebundle(bundle, config, proxy);
  })
  .on('error', function () {
    // крашим процесс, если мы делаем сборку финальной версии
    if (config.options.mode == 'dist') {
      process.exit(1);
    }
  });

bundler.rebundle(bundle, config, proxy);
