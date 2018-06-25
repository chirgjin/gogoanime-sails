module.exports = {


  friendlyName: 'Episodes',


  description: 'Episodes scraper.',


  inputs: {
    gogoanimeId : {
      type : 'number',
      required : true,
      min : 1,
    },
    epStart : {
      type : 'number',
      defaultsTo : 0,
      min : 0
    },
    epEnd : {
      type : 'number',
      defaultsTo : 999,
      max : 9999
    }
  },


  exits: {

  },


  fn: async function (inputs, exits) {

    let request = sails.helpers.request;
    let $;

    try {
      $ = await request(`${sails.config.custom.gogoanimeDomain}/load-list-episode?ep_start=${inputs.epStart}&ep_end=${inputs.epEnd}&id=${inputs.gogoanimeId}&default_ep=0`);
    }
    catch (e) {
      return exits.error(e);
    }

    let episodes = [];

    $('li').each( (i,li) => {
      li = $(li);

      episodes.push({
        url : li.find('a').attr('href').trim(),
        episode : parseInt( li.find('.name').text().replace(/Ep\s/i,'').trim() )
      });

    });

    return exits.success(episodes);

  }


};
