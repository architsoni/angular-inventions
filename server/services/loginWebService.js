var Q = require('q');
var Status = require('../../models/Status');
var userService = require('./userService.js');
var bcrypt = require('bcryptjs');
var Constants = require('../../config/messages');

/* This file is just a mockup of user authentication. Needs to be replaced with database checks. */
// var defaultUser = {
//   id: 1,
//   username: 'test',
//   name: 'Test Testsson',
//   validPassword: function(password) {
//     return password === 'test123';
//   }
// };

module.exports = {
  login: function(username, password) {
    var deferred = Q.defer();
    userService.getUserByEmail(username).then(function (user) {
      if (user && username === user.email && bcrypt.compareSync(password, user.password) && user.active === true) {
        deferred.resolve(new Status(Status.OK, Constants.MESSAGES.USER.LOGIN.SUCCESS, user));
      } else {
        deferred.reject(new Status(Status.ERROR, Constants.MESSAGES.USER.LOGIN.ERROR));
      }
    }).catch(function(error) {
      deferred.reject(error);
    });

    return deferred.promise;
  },
  logout: function(user) {
    return userService.updateLastValid(user._id);
  },
  getUserFromId: function(userId) {
    var deferred = Q.defer();
    userService.getUserById(userId).then(function (user) {
      if (user) {
        deferred.resolve(user);
      } else {
        deferred.reject(Constants.MESSAGES.USER.GET.ERROR_NO_USER + userId);
      }
    }).catch(function(error) {
      deferred.reject(error);
    });

    return deferred.promise;
  }
};
