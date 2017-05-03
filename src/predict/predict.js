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
    let W=items[0].W;
    let b=items[0].b;
    callback(getLogReg(W, b, request.payload.input.data));
  });
}
