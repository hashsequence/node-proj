/*
var somePromise = new Promise((resolve, reject) => {
  setTimeout(() => {
      resolve('Hey. It worked.');
      reject('It didn\'t work :(');
  }, 2500);
});


somePromise.then((message) => {
  console.log('Success: ',message)
}, (errorMessage) => {
  console.log(errorMessage);
});
*/

var asyncAdd = (a,b) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (typeof a === 'number' && typeof b === 'number') {
        resolve(a+b);
      } else {
        reject('Arguments must be numbers');
      }
    });
  });
}

asyncAdd(3,7).then((res) => {
  console.log('Result: ', res);
}, (errorMessage) => {
  console.log(errorMessage);
});

asyncAdd(3,'a').then((res) => {
  console.log('Result: ', res);
}, (errorMessage) => {
  console.log(errorMessage);
});

//chaining promises
asyncAdd(3,7).then((res) => {
  console.log('Result: ', res);
  return asyncAdd(res, 33);
}, (errorMessage) => {
  console.log(errorMessage);
}).then((res) => {
  console.log('Result: ', res);
}, (errorMessage) => {
  console.log(errorMessage);
});

asyncAdd(3,7).then((res) => {
  console.log('Result: ', res);
  return asyncAdd(res, 'b');
}, (errorMessage) => {
  console.log(errorMessage);
}).then((res) => {
  console.log('Result: ', res);
}, (errorMessage) => {
  console.log(errorMessage);
});
