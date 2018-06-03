const expect = require('expect');
const rewire = require('rewire');

var app = rewire('./app');

describe('App', () => {

//replaces actual db.saveUser function with the spy
var db = {
  saveUser: expect.createSpy()
};

app.__set__('db', db);

  it('should call the spy correctly', () => {
    var spy = expect.createSpy();
    spy('Avery',90);
    //spy must be called otherwise test fail
    expect(spy).toHaveBeenCalledWith('Avery',90);
  });

  it('should call saveUser with user object', () => {
    var email = 'avery@example.com';
    var password = '123blah';

    app.handleSignup(email,password);
    expect(db.saveUser).toHaveBeenCalledWith({email, password});
  });
});
