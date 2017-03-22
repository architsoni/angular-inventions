var userModel = require('../../models/User');
var Q = require('q');
var Status = require('../../models/Status');
var Constants = require('../../config/messages');

module.exports = {
  create: function (userData) {
    var deferred = Q.defer();

    var user = new userModel(userData);
    user.save(function (err, userDoc) {
      if (err) {
        deferred.reject(new Status(Status.ERROR, Constants.MESSAGES.USER.CREATE.ERROR, err));
      } else {
        delete userDoc._doc.password;
        deferred.resolve(new Status(Status.OK, Constants.MESSAGES.USER.CREATE.SUCCESS, userDoc._doc));
      }
    });

    return deferred.promise;
  },

  getUserByEmail: function (email) {
    var deferred = Q.defer();
    userModel.findOne({ email: email, active: true }, function (err, user) {
      if (err) {
        deferred.reject(new Status(Status.ERROR, Constants.MESSAGES.USER.GET.ERROR, err));
      } else {
        deferred.resolve(user);
      }
    });
    return deferred.promise;
  },

  getUserById: function (id) {
    var deferred = Q.defer();
    userModel.findOne({ _id: id, active: true}, function (err, user) {
      if (err) {
        deferred.reject(new Status(Status.ERROR, Constants.MESSAGES.USER.GET.ERROR, err));
      } else {
        deferred.resolve(user);
      }
    });
    return deferred.promise;
  },

  updateLastValid: function(id) {
    var deferred = Q.defer();
    userModel.findByIdAndUpdate(id, { 'lastValid': new Date() }, function (err, user) {
      if (err) {
        deferred.reject(new Status(Status.ERROR, Constants.MESSAGES.AUTH.UPDATE_ERROR, err));
      } else {
        deferred.resolve(new Status(Status.OK, user));
      }
    });
    return deferred.promise;
  },

  update: function (userId, updatedData) {
    var deferred = Q.defer();
    userModel.update({_id: userId}, {$set: updatedData.data}, function (err, res) {
      if (err) {
        deferred.reject(new Status(Status.ERROR, Constants.MESSAGES.USER.UPDATE.ERROR, err));
      }
      else {
        delete updatedData.data.password;
        deferred.resolve(new Status(Status.OK, Constants.MESSAGES.USER.UPDATE.SUCCESS.replace('{userId}', userId), updatedData.data));
      }
    });
    userModel.update({_id: userId}, {$unset: updatedData.unsetFields}, function (err1, res1) {
      if (err1) {
        console.log(err1);
      }
    });

    return deferred.promise;
  },

  checkDuplicate: function (userId, email) {
    var deferred = Q.defer();
    userModel.find({_id: {$ne: userId}, email: email}, function (error, doc) {
      if (error) {
        deferred.reject(new Status(Status.ERROR, Constants.MESSAGES.USER.UPDATE.ERROR, error));
      }
      else if (doc.length > 0) {
        deferred.reject(new Status(Status.ERROR, Constants.MESSAGES.USER.CREATE.DUPLICATE));
      }
      else {
        deferred.resolve(new Status(Status.OK, Constants.MESSAGES.USER.GET.SUCCESS));
      }
    });
    return deferred.promise;
  },

  get: function (userId) {
    var deferred = Q.defer();
    userModel.findOne({_id: userId}, function (err, userDoc) {
      if (err) {
        deferred.reject(new Status(Status.ERROR, Constants.MESSAGES.USER.GET.NO_USER, err));
      }
      else if (userDoc) {
        delete userDoc._doc.authToken;
        deferred.resolve(new Status(Status.OK, Constants.MESSAGES.USER.GET.SUCCESS, userDoc));
      }
      else {
        deferred.reject(new Status(Status.ERROR, Constants.MESSAGES.USER.GET.NO_USER));
      }
    });
    return deferred.promise;
  },

  remove: function (userId) {
    var deferred = Q.defer();
    userModel.update({_id: userId}, {$set: {active: false}}, function (err, doc) {
      if (err) {
        deferred.reject(new Status(Status.ERROR, Constants.MESSAGES.USER.GET.ERROR, err));
      }
      else {
        deferred.resolve(doc);
      }
    });
    return deferred.promise;
  }
};
