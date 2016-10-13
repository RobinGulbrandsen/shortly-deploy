var bcrypt = require('bcrypt-nodejs');
var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  username: String,
  password: String,
  salt: String,
  createdAt: {type: Date, default: Date.now},
  updatedAt: {type: Date, default: Date.now}
});

userSchema.pre('save', function(next) {
  this.salt = bcrypt.genSaltSync();
  this.password = bcrypt.hashSync(this.password, this.salt);
  next();
});

userSchema.methods.comparePassword = function(attemptedPassword, callback) {
  bcrypt.compare(attemptedPassword, this.password, function(err, isMatch) {
    callback(isMatch);
  });
};

module.exports = mongoose.model('user', userSchema);