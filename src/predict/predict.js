module.exports.predict = function(request) {
  let Joi = require('joi')
  let getLogReg = require('../getLogReg');

  let payload = {
    input :Joi.object().required()
  }
  console.log("ha");
  let error="";
  let err =Joi.validate(request.payload,payload,error);
  if (err.error==null) {
    return getLogReg(request.payload.input.data);
  }
  else {
    return err;
  }
}
