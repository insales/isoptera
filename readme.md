# Isoptera

Сборщик различных вспомогательных пакетов для тем InSales

## commands args

`isoptera --config|-c path/to/config.json [--url|-u shop.url] [--shop|-s shop-tech-domain] [--theme-id|-i theme-id]`

* `--config`, `-c` - путь к конфиг файлу
* `--url`, `-u`
* `--shop`, `-s`
* `--theme-id`, `-i`

## configfile

Можно

````json
{
  "source": "path/to/entry.js",
  "dist": "path/to/dist/file.js",

  "bfPlugins": [
    {
      "name": "browserify-plugin-name",
      "options": "plugin options"
    }
  ],
  "bfTransforms": [
    {
      "name": "browserify-transform-name",
      "options": "transform options"
    }
  ],
  "useProxy": true,
  "bs-plugins": [
    {
      "name": "browser-sync-plugin-name",
      "options": "plugin options"
    }
  ]
}
````
