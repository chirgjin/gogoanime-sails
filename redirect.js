module.exports = function redirect(location) {
  console.log(arguments);
  
  this.res.location( location || '/' );
};
