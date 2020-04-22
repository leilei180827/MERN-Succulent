const Constants = require("./Constants");
const User = require("../models/User");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
module.exports = function (passport) {
  let opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  opts.secretOrKey = Constants.SECRET;
  passport.use(
    new JwtStrategy(opts, function (jwt_payload, done) {
      User.findOne({ _id: jwt_payload.data._id }, (err, user) => {
        if (err) {
          return done(err, false);
        }
        if (user) {
          delete user.password;
          return done(null, user);
        } else {
          return done(null, false);
        }
      });
    })
  );
};
