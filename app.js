'use strict';
const qqStrategy = require('passport-qq').Strategy;
const assert = require('assert');

module.exports = app => {

  const config = app.config.passportQQ;
  config.passReqToCallback = true;
  assert(config.key, '[egg-passport-qq] config.passportQQ.key required');
  assert(config.secret, '[egg-passport-qq] config.passportQQ.secret required');
  config.clientID = config.key;
  config.clientSecret = config.secret;
  config.photoField = config.photoField || 'figureurl_2';
  const client = 'qq';

  app.passport.use(client, new qqStrategy(config, (req, accessToken, refreshToken, profile, done) => {
    app.logger.info('%j', profile);
    // {"provider":"qq","id":"xxxx","nickname":"spence","_raw":"{\n \"ret\": 0,\n \"msg\": \"\",\n \"is_lost\":0,\n \"nickname\": \"spence\",\n \"gender\": \"男\",\n \"gender_type\": 1,\n \"province\": \"上海\",\n \"city\": \"闵行\",\n \"year\": \"1988\",\n \"constellation\": \"\",\n \"figureurl\": \"http:\\/\\/qzapp.qlogo.cn\\/qzapp\\/101846604\\/ED39A9FB7B55D1985FAB3588FB16C9AE\\/30\",\n \"figureurl_1\": \"http:\\/\\/qzapp.qlogo.cn\\/qzapp\\/101846604\\/ED39A9FB7B55D1985FAB3588FB16C9AE\\/50\",\n \"figureurl_2\": \"http:\\/\\/qzapp.qlogo.cn\\/qzapp\\/101846604\\/ED39A9FB7B55D1985FAB3588FB16C9AE\\/100\",\n \"figureurl_qq_1\": \"http://thirdqq.qlogo.cn/g?b=oidb&k=Lh68qmaUE0uiaPOw752tQZw&s=40&t=1556496609\",\n \"figureurl_qq_2\": \"http://thirdqq.qlogo.cn/g?b=oidb&k=Lh68qmaUE0uiaPOw752tQZw&s=100&t=1556496609\",\n \"figureurl_qq\": \"http://thirdqq.qlogo.cn/g?b=oidb&k=Lh68qmaUE0uiaPOw752tQZw&s=640&t=1556496609\",\n \"figureurl_type\": \"1\",\n \"is_yellow_vip\": \"0\",\n \"vip\": \"0\",\n \"yellow_vip_level\": \"0\",\n \"level\": \"0\",\n \"is_yellow_year_vip\": \"0\"\n}\n","_json":{"ret":0,"msg":"","is_lost":0,"nickname":"spence","gender":"男","gender_type":1,"province":"上海","city":"闵行","year":"1988","constellation":"","figureurl":"http://qzapp.qlogo.cn/qzapp/101846604/ED39A9FB7B55D1985FAB3588FB16C9AE/30","figureurl_1":"http://qzapp.qlogo.cn/qzapp/101846604/ED39A9FB7B55D1985FAB3588FB16C9AE/50","figureurl_2":"http://qzapp.qlogo.cn/qzapp/101846604/ED39A9FB7B55D1985FAB3588FB16C9AE/100","figureurl_qq_1":"http://thirdqq.qlogo.cn/g?b=oidb&k=Lh68qmaUE0uiaPOw752tQZw&s=40&t=1556496609","figureurl_qq_2":"http://thirdqq.qlogo.cn/g?b=oidb&k=Lh68qmaUE0uiaPOw752tQZw&s=100&t=1556496609","figureurl_qq":"http://thirdqq.qlogo.cn/g?b=oidb&k=Lh68qmaUE0uiaPOw752tQZw&s=640&t=1556496609","figureurl_type":"1","is_yellow_vip":"0","vip":"0","yellow_vip_level":"0","level":"0","is_yellow_year_vip":"0"}}

    // https://wiki.connect.qq.com/get_user_info
    // nickname	用户在QQ空间的昵称。
    // figureurl	大小为30×30像素的QQ空间头像URL。
    // figureurl_1	大小为50×50像素的QQ空间头像URL。
    // figureurl_2	大小为100×100像素的QQ空间头像URL。
    // figureurl_qq_1	大小为40×40像素的QQ头像URL。
    // figureurl_qq_2	大小为100×100像素的QQ头像URL。需要注意，不是所有的用户都拥有QQ的100x100的头像，但40x40像素则是一定会有。

    const user = {
      provider: 'qq',
      id: profile.id,
      displayName: profile.nickname,
      photo: profile._json[config.photoField],
      profile,
      accessToken,
      refreshToken,
    };

    app.passport.doVerify(req, user, done);
  }));
};
