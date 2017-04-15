require('../getLogReg');
let Joi = require('joi')

let payload = {
  input :Joi.object().required()
}
/**
 * Created by bruceq on 13/04/17.
 */
module.exports.predict = function(request) {
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
