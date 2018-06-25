
module.exports = function success(data) {
  return this.res.json({
    success : true,
    data    : data,
  });
};
