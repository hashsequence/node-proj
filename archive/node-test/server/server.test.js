const request = require('supertest');
const expect = require('expect');

var app = require('./server.js').app;

describe('Server', () => {
  describe('GET', () => {
    it('should return  404 error object', (done) => {
      request(app)
      .get('/')
      .expect(400)
      .expect((res) => {
        expect(res.body).toInclude({
            error : 'page not found'
        });
      })
      .end(done);
    });
  });

  describe('GET/users', () => {
    it('should return array of user object', (done) => {
      request(app)
      .get('/users')
      .expect(200)
      .expect((res) => {
        expect(res.body).toInclude({
          name : 'Avery',
          age : '90'
        });
      })
      .end(done);
    })
  });

});
