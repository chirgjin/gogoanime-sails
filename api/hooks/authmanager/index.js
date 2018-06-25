

module.exports = function defineAuthManager(sails) {

  let passport = require('passport');

  return {

    initialize: async function (done) {

      var Strategy = require('passport-local').Strategy;

      passport.use(new Strategy(
        async (username,password,done) => {

          let user;

          try {
            user = await User.findOne({
              where : {
                username : username,
              }
            }).decrypt();
          }
          catch (e) {
            return done(e);
          }

          if(user === undefined) {
            return done(null,false,{ message : 'Incorrect username' });
          }

          if(user.password !== password) {
            return done(null,false,{ message : 'Incorrect Credentials!'});
          }

          return done(null,user);

        }
      ));

      passport.serializeUser( (user, cb) => {
        sails.log.verbose('Trying to serialize user ',user);

        cb(null,user.id);
      });

      passport.deserializeUser( (id, cb) => {

        sails.log.verbose('Trying to deserialize user#',id);

        User.findOne({
          where : {
            id : id
          }
        }).then(user => {

          if(user === undefined) {
            return cb(new Error('No user found!'));
          }
          
          sails.log.verbose('Deserialized user#%d',id,user);

          cb(null,user);
          
        }).catch( err => {
          cb(err);
        });

      });

      done();
    },
    passport : passport
  };
};
