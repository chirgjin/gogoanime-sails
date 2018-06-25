let request = require('request-promise');
let cheerio = require('cheerio');

module.exports = {


  friendlyName: 'Request',


  description: 'Request something.',


  inputs: {
    data : {
      type : 'ref',
      required : true,
    }
  },


  exits: {

  },


  fn: async function (inputs, exits) {

    // All done.
    let data = typeof inputs.data === 'object' ? inputs.data : { url : inputs.data };

    data.transform = (body) => {
      return cheerio.load(body);
    };

    return exits.success(await request(data));

  }


};

