module.exports = {


  friendlyName: 'Create anime',


  description: '',


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

    let where = { or : [] };
    let data = Anime.params(inputs.data);



    if(data.id) {
      return exits.success( (await Anime.update({
        id : data.id,
      },data).fetch())[0] );
    }

    if(data.slug) {
      where.or.push({slug : data.slug});
    }

    if(data.gogoanimeId) {
      where.or.push({gogoanimeId : data.gogoanimeId});
    }


    if(!data.slug && !data.gogoanimeId) {
      return exits.error('missing unique field!');
    }

    let num = await Anime.count(where);

    if(num < 1) {
      return exits.success(await Anime.create(data).fetch());
    }

    return exits.success( (await Anime.update(where,data).fetch())[0] );
  }


};

