var organizationModel = require('../../models/Organization');
var Q = require('q');
var Status = require('../../models/Status');
var Constants = require('../../config/messages');
var userService = require('./userService');
var commonService = require('./commonService');

module.exports = {
  create: function (orgData) {
    var deferred = Q.defer();
    var organization = new organizationModel(orgData);
    organization.save(function (err, orgDoc) {
      if (err) {
        deferred.reject(new Status(Status.ERROR, Constants.MESSAGES.ORGANIZATION.CREATE.ERROR, err));
      } else {
        if (orgDoc._doc.parent.length === 0) {
          delete orgDoc._doc.parent;
        }
        if (orgDoc._doc.users.length === 0) {
          delete orgDoc._doc.users;
        }
        deferred.resolve(new Status(Status.OK, Constants.MESSAGES.ORGANIZATION.CREATE.SUCCESS.replace('{orgId}', orgDoc._doc._id), orgDoc._doc));
      }
    });

    return deferred.promise;
  },

  update: function (orgId, updatedData) {
    var deferred = Q.defer();
    organizationModel.update({_id: orgId}, {$set: updatedData.data}, function (err, res) {
      if (err) {
        deferred.reject(new Status(Status.ERROR, Constants.MESSAGES.ORGANIZATION.UPDATE.ERROR, err));
      }
      else {
        deferred.resolve(new Status(Status.OK, Constants.MESSAGES.ORGANIZATION.UPDATE.SUCCESS.replace('{orgId}', orgId), updatedData.data));
      }
    });
    organizationModel.update({_id: orgId}, {$unset: updatedData.unsetFields}, function (err1, res1) {
      if (err1) {
        console.log(err1);
      }
    });
    return deferred.promise;
  },

  get: function (orgId) {
    var deferred = Q.defer();
    organizationModel.findOne({_id: orgId}, function (err, orgDoc) {
      if (err) {
        deferred.reject(new Status(Status.ERROR, Constants.MESSAGES.ORGANIZATION.GET.NO_ORG. err));
      }
      else if (orgDoc) {
        if (orgDoc._doc.parent.length === 0) {
          delete orgDoc._doc.parent;
        }
        if (orgDoc._doc.users.length === 0) {
          delete orgDoc._doc.users;
        }
        deferred.resolve(new Status(Status.OK, Constants.MESSAGES.ORGANIZATION.GET.SUCCESS, orgDoc));
      }
      else {
        deferred.reject(new Status(Status.ERROR, Constants.MESSAGES.ORGANIZATION.GET.NO_ORG));
      }
    });
    return deferred.promise;
  },

  remove: function (orgId) {
    var deferred = Q.defer();
    organizationModel.update({_id: orgId}, {$set: {active: false}}, function (err, orgDoc) {
      if (err) {
        deferred.reject(new Status(Status.ERROR, Constants.MESSAGES.ORGANIZATION.DELETE.ERROR, err));
      }
      else {
        deferred.resolve();
      }
    });
    return deferred.promise;
  }
};
