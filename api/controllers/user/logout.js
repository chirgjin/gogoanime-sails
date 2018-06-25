module.exports = {


  friendlyName: 'Logout',


  description: 'Logout user.',


  inputs: {

  },


  exits: {
    success : {
      responseType : 'redirect',
      location : '/',
    },
  },


  fn: async function (inputs, exits) {

    this.req.logout();

    return exits.success('/');

  }


};
