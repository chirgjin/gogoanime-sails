module.exports = {


  friendlyName: 'Load',


  description: 'Load anime.',


  inputs: {
    slug : {
      type : 'string',
      required : true,
      minLength : 3
    }
  },


  exits: {

  },


  fn: async function (inputs, exits) {

    let anime = await Anime.findOne({
      slug : inputs.slug
    }).populate('episodes');

    for(let i=0; i<anime.episodes.length; i++) {
      anime.episodes[i].urls = await EpisodeUrls.find({ episodeId : anime.episodes[i].id });
    }
    
    return exits.success(anime);

  }


};
