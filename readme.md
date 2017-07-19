# Isoptera

Сборщик различных вспомогательных пакетов для тем InSales

## commands args

`isoptera --config|-c path/to/config.json [--url|-u shop.url] [--shop|-s shop-tech-domain] [--theme-id|-i theme-id]`

* `--config`, `-c` - путь к конфиг файлу
* `--url`, `-u`
* `--shop`, `-s`
* `--theme-id`, `-i`

## configfile

Можно создавать различные конфиги для разных задач.

````yaml
source: 'path/to/entry.js'
dist: 'path/to/dist/file.js'

browserify:
  - plugins
    - name: 'browserify-plugin-name'
      options: 'plugin options'

  - transforms
    - name: 'browserify-transform-name'
      options: 'transform options'

browserSync:
  config
````

## Пример структуры проекта с `isoptera`

````
source/
  index.js
dist/
  .gitkeep
test/
  .gitkeep
package.json
config
  isoptera.dev.yaml
  isoptera.dist.yaml
````

config/isoptera.dev.json

````yaml
source: source/index.js
dist: test/test.module.js

browserify:
  plugins:
    - name: watchify

  transforms:
    - name: eslintify
      options:
        passthrough: [ 'errors', 'warnings' ]
    - name: scssify
      options:
        autoInject:
          prepend: true
          verbose: true
        sass:
          sourceMapEmbed: false
          includePaths: ['node_modules']
        postcss:
          autoprefixer:
            browsers: ['last 2 versions', '> 1%', 'IE >= 11']
    - name: jstify
      options:
        engine: global
    - name: nocommentify

browserSync:
  https: false
  serveStatic: ['.']
  rewriteRules:
    - match: https://localhost/assets/test.module.js
      replace: /test/test.module.js
````

В `package.json` настроить секцию `scripts`, например:

````json
"scripts": {
  "test": "echo \"Error: no test specified\" && exit 1",
  "dev": "node node_modules/isoptera -c config/isoptera.dev.yaml",
  "dist": "node node_modules/isoptera -c config/isoptera.dist.yaml"
}
````

и вызывать командами

`npm run dev -- -s shop-tech-domain`
