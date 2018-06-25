module.exports = {


  friendlyName: 'Baseurl',


  description: 'Baseurl or the app.',


  inputs: {
    path : {
      defaultsTo : '',
      type : 'string',
      description : 'path to add after the base url'
    }
  },


  exits: {

  },

  sync : true,

  fn: function (inputs, exits) {

    let path = inputs.path.replace(/^\//,'');

    let url = `//${sails.config.custom.domainName}${sails.config.custom.port === 80 ? '' : `:${sails.config.custom.port}`}/${path}`;

    return exits.success(url);

  }


};

