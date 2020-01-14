# egg-passport-qq2

## 开启插件

```js
// {app_root}/config/plugin.js
exports.passportQQ = {
  enable: true,
  package: 'egg-passport-qq2',
};
```

## 配置

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

## 单元测试

<!-- 描述如何在单元测试中使用此插件，例如 schedule 如何触发。无则省略。-->

## License

[MIT](LICENSE)
