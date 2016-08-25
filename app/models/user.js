var db = require('../config').db;
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');
var mongoose = require('mongoose');
var Users = require('../config').Users;

var User = mongoose.model('User', 'Users');

User.prototype.comparePassword = function(attemptedPassword, callback) {
    bcrypt.compare(attemptedPassword, this.password, function(err, isMatch) {
      if (err) {
        callback(err);
      }
      callback(isMatch);
    });
};
Users.pre('save', function(next) {
  var cipher = Promise.promisify(bcrypt.hash);
  return cipher(this.password, null, null).bind(this)
    .then(function(hash) {
      this.password = hash;
      next();
    });
});

module.exports = User;
