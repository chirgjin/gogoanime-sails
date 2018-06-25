module.exports = {


  friendlyName: 'Signup',


  description: 'Signup user.',


  inputs: {
    username : {
      type : 'string',
      required : true,
    },
    email : {
      type : 'string',
      isEmail : true,
      required : true,
    },
    password : {
      type : 'string',
      required : true,
      minLength : 5,
    },
  },


  exits: {
    success : {
      responseType : 'success',
    },
    fail : {
      responseType : 'fail',
    }
  },


  fn: async function (inputs, exits) {

    if( !this.req || this.req.user ) {
      return exits.fail('user already logged in!');
    }

    try {
      await User.create({
        username : inputs.username,
        email : inputs.email,
        password : inputs.password,
      });
    }
    catch (e) {

      if(e.code === 'E_UNIQUE') {
        return exits.fail(`${e.attrNames[0]} already exists!`);
      }

      return exits.fail(`Can't register`);
    }

    return exits.success({created : true});
  }


};
