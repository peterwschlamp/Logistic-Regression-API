module.exports.predict = function(request, db, callback) {
  let Joi = require('joi')
  let getLogReg = require('../getLogReg');

  let payload = {
    input :Joi.object().required()
  }
  let error="";
  let err =Joi.validate(request.payload,payload,error);

  var collection = db.collection('myCollection');
  collection.find().toArray(function(err, items) {
    //console.log(items[0].dependents);
    console.log( getLogReg(items[0].independents, items[0].dependents, request.payload.input.data) );
    callback( getLogReg(items[0].independents, items[0].dependents, request.payload.input.data) );
  });
/*
  if (err.error==null) {
    return getLogReg(request.payload.input.data);
  }
  else {
    return err;
  }
  */
}
