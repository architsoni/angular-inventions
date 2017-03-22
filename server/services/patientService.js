var patientModel = require('../../models/Patient');
var Q = require('q');
var Status = require('../../models/Status');
var Constants = require('../../config/messages');
var organizationService = require('./organizationService');
var commonService = require('./commonService');

module.exports = {
  create: function (patientData) {
    var deferred = Q.defer();

    var patient = new patientModel(patientData);
    patient.save(function (err, patientDoc) {
      if (err) {
        deferred.reject(new Status(Status.ERROR, Constants.MESSAGES.PATIENT.CREATE.ERROR, err));
      } else {
        deferred.resolve(new Status(Status.OK, Constants.MESSAGES.PATIENT.CREATE.SUCCESS, patientDoc._doc));
      }
    });

    return deferred.promise;
  },

  getPatientByEmail: function (email) {
    var deferred = Q.defer();
    patientModel.findOne({email: email}, function (err, patientDoc) {
      if (err) {
        deferred.reject(new Status(Status.ERROR, Constants.MESSAGES.PATIENT.GET.ERROR, err));
      } else {
        deferred.resolve(patientDoc);
      }
    });
    return deferred.promise;
  },

  get: function (patientId) {
    var deferred = Q.defer();
    patientModel.findOne({_id: patientId}, function (err, patientDoc) {
      if (err) {
        deferred.reject(new Status(Status.ERROR, Constants.MESSAGES.PATIENT.GET.ERROR, err));
      } else if(patientDoc) {
        deferred.resolve(new Status(Status.OK, Constants.MESSAGES.PATIENT.GET.SUCCESS, patientDoc));
      }
      else {
        deferred.reject(new Status(Status.ERROR, Constants.MESSAGES.PATIENT.GET.NO_PATIENT));
      }
    });
    return deferred.promise;
  },

  update: function (patientId, updatedData) {
    var deferred = Q.defer();
    patientModel.update({_id: patientId}, {$set: updatedData.data}, function (err1, res) {
      if (err1) {
        deferred.reject(new Status(Status.ERROR, Constants.MESSAGES.PATIENT.UPDATE.ERROR, err1));
      }
      else {
        deferred.resolve(new Status(Status.OK, Constants.MESSAGES.PATIENT.UPDATE.SUCCESS.replace('{patientId}', patientId), updatedData.data));
      }
    });
    patientModel.update({_id: patientId}, {$unset: updatedData.unsetFields}, function (err2) {
      if (err2) {
        console.log(err2);
      }
    });
    return deferred.promise;
  },

  checkDuplicate: function (patientId, email) {
    var deferred = Q.defer();
    patientModel.find({_id: {$ne: patientId}, email: email}, function (err, patientDoc) {
      if (err) {
        deferred.reject(new Status(Status.ERROR, Constants.MESSAGES.PATIENT.UPDATE.ERROR, err));
      }
      else if (patientDoc.length > 0) {
        deferred.reject(new Status(Status.ERROR, Constants.MESSAGES.PATIENT.CREATE.DUPLICATE));
      }
      else {
        deferred.resolve(new Status(Status.OK, Constants.MESSAGES.PATIENT.GET.SUCCESS));
      }
    });
    return deferred.promise;
  },

  getAll: function (orgId) {
    var deferred = Q.defer();
    
    patientModel.find({organizationId: orgId}, function (err, patients) {
      if (err) {
        deferred.reject(new Status(Status.ERROR, Constants.MESSAGES.PATIENT.GET.ERROR, err));
      }
      else {
        deferred.resolve(new Status(Status.OK, Constants.MESSAGES.PATIENT.GET.SUCCESS, patients));
      }
    });

    return deferred.promise;
  }
};
