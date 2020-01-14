# egg-passport-qq2

## Usage

```js
// {app_root}/config/plugin.js
exports.passportQQ = {
  enable: true,
  package: 'egg-passport-qq2',
};
```

## Configuration

```js
// {app_root}/config/config.default.js
'use strict';

module.exports = appInfo => {
  return {
    passportQQ: {
      key: '',
      secret: '',
    },
  };
};
```
see [config/config.default.js](https://github.com/logzh/egg-passport-qq/blob/master/config/config.default.js) for more detail

## Questions & Suggestions

Please open an issue [here](https://github.com/logzh/egg-passport-qq/issues).

## License

[MIT](LICENSE)
