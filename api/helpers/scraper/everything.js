module.exports = {


  friendlyName: 'Everything',


  description: 'Everything scraper.',


  inputs: {
    slug : {
      type : 'string',
      required : true,
      description : 'slug of anime to scrape',
    }
  },


  exits: {

  },


  fn: async function (inputs, exits) {

    // All done.
    let anime    = sails.helpers.scraper.anime;
    let episodes = sails.helpers.scraper.episodes;

    anime = await anime(inputs.slug);

    episodes = await episodes(anime.gogoanimeId);

    anime.episodes = [];

    for(let i=0; i<episodes.length; i++) {
      let epi = episodes[i];
      epi.animeId = anime.id;

      anime.episodes.push(
        await sails.helpers.scraper.episode(epi)
      );
      
    }

    return exits.success(anime);

  }


};

