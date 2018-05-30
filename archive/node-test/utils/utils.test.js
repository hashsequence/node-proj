const utils = require('./utils.js');
const expect = require('expect');


it('should add two numbers', () => {
  var res = utils.add(33,11);

  expect(res).toBe(44, 'should be 44').toBeA('number');

  if (res !== 44) {
    throw new Error(`Expected 44, but got ${res}.`);
  }

});

it('should square the number', () => {
  var res = utils.square(8);

  expect(res).toBe(64, 'Should be 64').toBeA('number');
  if (res !== 64) {
    throw new Error(`Expected 44, but got ${res}.`);
  }
});

it('should expect some values', () => {
  //expect(12).toNotBe(12);
  expect({name : 'Avery'}).toEqual({name : 'Avery'});
  //use toEqual for objects or arrays
  expect([2,3,4]).toExclude(1);

  expect({
    name : 'Avery',
    age : '90',
    location : 'Toronto'
  }).toExclude(
    {
      age : '70'
    }
  )

});


it('should verify first and last names are set', () => {

  var user = {
    name : 'Avery Wong',
    location : 'Toronto'
  };

  var res = utils.setName(user, 'Avery Wong');
  expect(user).toEqual(res);

  expect(res).toInclude({
    firstName : 'Avery',
    lastName : 'Wong'
  })
})
