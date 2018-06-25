
module.exports = async function (req,res,proceed) {

  if(req.user) {
    return proceed();
  }


  res.forbidden();

};
