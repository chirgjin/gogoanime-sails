module.exports = {


  friendlyName: 'Latest',


  description: 'Latest anime.',


  inputs: {
    page : {
      type : 'number',
      defaultsTo : 1,
    }
  },


  exits: {
    success : {
      responseType : 'success'
    }
  },


  fn: async function (inputs, exits) {

    let resultsPerPage = 20;

    let animes = await Anime.find({
      sort : 'updatedAt DESC',
      skip : (inputs.page - 1) * resultsPerPage,
      limit : resultsPerPage,
    });

    return exits.success(animes);

  }


};
