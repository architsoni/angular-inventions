var bcrypt = require('bcryptjs');

module.exports = {
  setUnsetFields: function (oldData, newData, requiredFields) {
    var unsetFields = {};
    var self = this;
    for (var property in newData) {
      if (newData.hasOwnProperty(property)) {
        if (newData[property] === null && requiredFields.indexOf(property) === -1) {
          unsetFields[property] = 1;
          if (oldData._doc) {
            delete oldData._doc[property];
          } else {
            delete oldData[property];
          }
        }
        else if (newData[property]) {
          if (typeof(newData[property]) === "object" && newData[property].constructor !== Array) {
            oldData[property] = oldData[property] ? oldData[property] : {};
            oldData[property] = self.setUnsetFields(oldData[property], newData[property], []).data;
          }
          else {
            oldData[property] = newData[property];
          }
        }
      }
    }

    return {data: oldData, unsetFields: unsetFields};
  },

  generatePassword: function (password) {
    return bcrypt.hashSync(password, 8);
  }
};
