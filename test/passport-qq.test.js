'use strict';

const request = require('supertest');
const mm = require('egg-mock');

describe('test/passport-qq.test.js', () => {
  let app;
  before(() => {
    app = mm.app({
      baseDir: 'apps/passport-qq-test',
    });
    return app.ready();
  });

  after(() => app.close());
  afterEach(mm.restore);

  it('should GET /', () => {
    return request(app.callback())
      .get('/')
      .expect('hi, passportQQ')
      .expect(200);
  });

  it('should GET /passport/qq redirect to auth url', () => {
    return request(app.callback())
      .get('/passport/qq')
      .expect('Location', /^https:\/\/graph.qq.com\/oauth2.0\/authorize/)
      .expect(302);
  });

  it('should GET /passport/qq/callback redirect to auth url', () => {
    return request(app.callback())
      .get('/passport/qq/callback')
      .expect('Location', /^https:\/\/graph.qq.com\/oauth2.0\/authorize/)
      .expect(302);
  });
});
