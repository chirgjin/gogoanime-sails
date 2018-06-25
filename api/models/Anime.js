module.exports = {
  attributes : {
    id : {
      type : 'number',
      autoIncrement : true,
    },
    gogoanimeId : {
      type : 'number',
      defaultsTo : 0,
      min : 1
    },
    title : {
      type : 'string',
    },
    releaseYear : {
      type : 'number',
    },
    season : {
      type : 'string',
    },
    summary : {
      type : 'string',
    },
    status : {
      type : 'string',
    },
    coverImage : {
      type : 'string',
    },
    slug : {
      type : 'string',
      unique : true
    },
    genres : {
      type : 'string',
      description : 'list of genre separated by comma(,)'
    },
    episodes : {
      collection : 'episodes',
      via : 'animeId',
    }
  },
  params : (data) => {
    let dummy = {};

    Object.keys(data).forEach(key => {
      if(key !== 'genres' && key !== 'episodes') {
        dummy[key] = data[key];
      }
      else if(key === 'genres') {
        dummy[key] = typeof data[key] === 'string' ? data[key] : data[key].join(',');
      }
    });

    return dummy;
  }
};
