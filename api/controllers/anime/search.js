module.exports = {


  friendlyName: 'Search',


  description: 'Search anime.',


  inputs: {
    query : {
      type : 'string',
      required : true,
      minLength : 3
    }
  },


  exits: {
    success : {
      responseType : 'success',
    }
  },


  fn: async function (inputs, exits) {

    let animes = await Anime.find({
      where : {
        or : [
          {
            title : {
              contains : inputs.query
            }
          },
          {
            summary : {
              contains : inputs.query
            }
          }
        ]
      },
      limit : 15
    });

    exits.success(animes);

  }


};
