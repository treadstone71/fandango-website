var bcrypt = require('bcrypt');

exports.cryptPassword = function(password, callback) {
   bcrypt.genSalt(10, function(err, salt) {
    if (err) 
      return callback(err);

    bcrypt.hash(password, salt, function(err, hash) {
      return callback(err, hash);
    });
  });
};

exports.comparePassword = function(plainPass, hashword, callback) {
   bcrypt.compare(plainPass, hashword, function(err, isPasswordMatch) {   
    console.log(err, isPasswordMatch);
       return err == null ?
           callback(null, isPasswordMatch) :
           callback(err);
   });
};

// exports.cryptPassword("1234", function(err, hash){
  // exports.comparePassword("pass", "$2b$10$0bu0G4K/uPaALi7tGmiD3uYuckUyPyhS5PYiTX", function(){console.log(arguments)});
// })