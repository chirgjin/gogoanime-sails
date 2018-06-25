module.exports = {
  attributes : {
    updatedAt : false,
    createdAt : false,

    episodeId : {
      model : 'episodes',
    },
    server : {
      type : 'string',
    },
    url : {
      type : 'string',
      isURL : true,
    }
  }
};
