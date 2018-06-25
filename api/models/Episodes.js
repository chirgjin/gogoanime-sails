module.exports = {
  attributes : {

    updatedAt : false,
    createdAt : false,

    id : {
      type : 'number',
      autoIncrement : true,
    },
    animeId : {
      model : 'anime',
    },
    episode : {
      type : 'number',
      defaultsTo : 0
    },
    urls : {
      collection : 'episodeurls',
      via : 'episodeId',
    }
  }
};
