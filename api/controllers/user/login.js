
module.exports = async function userLogin(req,res,next) {

  let username = req.query.username;
  let password = req.query.password;
  
  sails.hooks.authmanager.passport.authenticate('local', (err,user,info) => {

    if(err) {
      sails.log.info(`Authenticating User[${username},${password}] Failed`,err);

      return res.json({ message : 'authentication failed' , success : false });
    }
    else if(!user) {
      return res.json(info || { message : 'authentication failed' , success : false });
    }

    req.login(user, (err) => {
      if(err) {
        sails.log.info(`Error serializing user ${user.username}: `,err);
        return res.json({ message : 'authentication failed' , success : false });
      }
      
      return res.json({ success : true , message : `Welcome ${user.username}`});
    });

  })(req,res,next);

};
