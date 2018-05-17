var getuser = (id, callback) => {
  var user = {
    id : id,
    name : 'Vikcram'
  };
  setTimeout(()=>{
  callback(user)}, 3000);

};

getuser(31, (userObject) => {console.log(userObject)});
