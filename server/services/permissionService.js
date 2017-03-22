var passport = require('../../config/passport');
var Status = require('../../models/Status');
var Constants = require('../../config/messages');

module.exports = {
  loggedIn: function (req, res, next) {
    passport.authenticate('jwt', {session: false}, function (err, user, info) {
      if (err && err.code && err.code !== 0) {
        res.send(err);
        return;
      } else if (!user) {
        if (info && info.name === 'TokenExpiredError') {
          res.send(new Status(Status.AUTH_FAILED, Constants.MESSAGES.AUTH.TOKEN_EXPIRE, "Expired at " + info.expiredAt));
        } else {
          res.send(new Status(Status.AUTH_FAILED, Constants.MESSAGES.AUTH.TOKEN_PAYLOAD_ERROR, err ? err.data : undefined));
        }
        return;
      }
      var token = passport.getToken(req);

      return passport.decodeToken(token).then(function (decodedToken) {
        if (!decodedToken.user) {
          res.send(new Status(Status.AUTH_FAILED, Constants.MESSAGES.AUTH.TOKEN_PAYLOAD_ERROR, decodedToken));
          return;
        }

        req.token = {
          user: user,
          lastValid: decodedToken.lastValid,
          expires: new Date(decodedToken.exp * 1000)
        };

        next();
      }).catch(function (error) {
        res.send(new Status(Status.AUTH_FAILED, Constants.MESSAGES.AUTH.TOKEN_EXPIRE, error));
        return;
      });
    })(req, res, next);
  },

  loggedOut: function (req, res, next) {
    passport.authenticate('jwt', {session: false}, function (err, user, info) {
      if (!user) {
        res.send(new Status(Status.AUTH_FAILED, Constants.MESSAGES.AUTH.TOKEN_EXPIRE, String(info)));
        return;
      }
      next();
    })(req, res, next);
  },

  isSuperAdmin: function (req, res, next) {
    var user = req.token.user;
    if (!user.role || (user.role !== Constants.ROLES.SUPER_ADMIN && user.role !== Constants.ROLES.ADMIN) ) {
      res.send(new Status(Status.PERM_DENIED, Constants.MESSAGES.AUTH.PERM_DENIED));
      return;
    }
    next();
  },

  isClinic: function (req, res, next) {
    var user = req.token.user;
    if (!user.type || user.type !== "clinic" ) {
      res.send(new Status(Status.PERM_DENIED, Constants.MESSAGES.AUTH.PERM_DENIED));
      return;
    }
    next();
  }
};
