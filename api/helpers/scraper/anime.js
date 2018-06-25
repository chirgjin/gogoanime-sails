module.exports = {


  friendlyName: 'Scrape Anime',


  description: 'Anime scraper.',


  inputs: {
    slug : {
      type : 'string',
    },
  },


  exits: {

  },


  fn: async function (inputs, exits) {

    let request = sails.helpers.request;
    let $;

    try {
      $ = await request( `${sails.config.custom.gogoanimeDomain}/category/${inputs.slug}`);
    }
    catch (e) {
      exits.error(e);
    }

    let data = {
      slug : inputs.slug,
    };

    let el = $('.anime_info_body_bg');

    data.gogoanimeId = parseInt($('#movie_id').val());

    data.title = el.find('h1').text();
    data.coverImage = el.find('img').attr('src');

    $('.type').each( (i,el) => {
      el = $(el);

      let span = el.find('span').text();
      let cont = el.text().replace(span,'');

      if(span.match(/type/i)) {
        data.season = cont.replace(/Anime$/i,'').trim();
      }
      else if(span.match(/genre/i)) {
        data.genres = cont.split(',').map(genre => genre.trim());
      }
      else if(span.match(/released/i)) {
        data.releaseYear = parseInt(cont);
      }
      else if(span.match(/status/i)) {
        data.status = cont;
      }
      else if(span.match(/summary/i)) {
        data.summary = cont;
      }
    });

    data = await sails.helpers.createAnime(data);


    return exits.success(data);

  }


};
