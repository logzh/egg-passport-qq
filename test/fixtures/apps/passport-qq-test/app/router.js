'use strict';

module.exports = app => {
  app.get('/', function* () {
    this.body = 'hi, ' + app.plugins.passportQQ.name;
  });

  app.passport.mount('qq');
};
