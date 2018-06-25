module.exports = {
  attributes : {
    'id' : {
      type : 'number',
      autoIncrement: true,
    },
    'username' : {
      type : 'string',
      unique : true,
      regex : /^[a-z0-9_]+$/,
      minLength : 3
    },
    'email' : {
      type : 'string',
      unique : true,
      isEmail : true,
    },
    'password' : {
      type : 'string',
      encrypt : true,
    },
    'lastactive' : {
      type : 'number',
      defaultsTo : (new Date()).getTime(),
    },
    'reset_token' : {
      type : 'string',
      allowNull : true,
      description : 'Reset token sent to user in case of password reset(null if no token sent)'
    },
    'reset_expiry' : {
      type : 'number',
      allowNull : true,
      description : 'The time (epoch ms) when a reset token expires(null if no token sent)'
    },
  }
};
