module.exports = {


  friendlyName: 'Episode',


  description: 'Episode scraper.',


  inputs: {
    episode : {
      type : 'ref',
      required : true,
      description : 'object containing url & episode(episode number) , animeid may also be provided via this',
    },
    animeId : {
      type : 'number',
      defaultsTo : 0
    },
    url : {
      type : 'string',
    }
  },


  exits: {

  },


  fn: async function (inputs, exits) {

    let request = sails.helpers.request;
    let $;
    let url = inputs.url || inputs.episode.url;

    try {
      $ = await request(`${sails.config.custom.gogoanimeDomain}/${url}`);
    }
    catch (e) {
      return exits.error(e);
    }

    let urls = [];

    $('.anime_muti_link').find('li').each( (i,li) => {
      li = $(li);

      let servers = {
        anime : 'vidstreaming',
        streamango : 'streamango',
        estram : 'estream',
        open : 'openupload',
        thevideo : 'thevideo',
        mp4 : 'mp4upload',
      };
      let srv = li.attr('class');

      if(srv === 'vidcdn') {
        return;
      }

      urls.push({
        server : servers[srv] || srv,
        url    : li.find('a').attr('data-video').replace(/^\/\//,'https://')
      });
    });

    let animeId = inputs.animeId || inputs.episode.animeId;

    if(!animeId || !inputs.episode.episode) {
      return exits.success({ urls : urls , epi : inputs.episode.episode , id : animeId});
    }

    let episode = await Episodes.create({
      episode : inputs.episode.episode,
      animeId : animeId,
    }).fetch();

    urls = urls.map( data => {
      data.episodeId = episode.id;
      return data;
    });

    let epiurls = await EpisodeUrls.createEach(urls).fetch();

    episode.urls = epiurls;

    return exits.success(episode);

  }


};
