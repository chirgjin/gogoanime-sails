
module.exports = function error(data) {
  return this.res.json({
    success : false,
    error   : data,
  });
};
