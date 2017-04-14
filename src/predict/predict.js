/**
 * Created by bruceq on 13/04/17.
 */
var Joi = require('joi')

var  payload =
    {
        email:Joi.string().email().required(),
        age   :Joi.number().integer().min(1).max(100).default(20)
    }
/**
 * Created by bruceq on 13/04/17.
 */
module.exports.predict = function(request) {
    console.log("ha");

    var error=error||{};
    var err =Joi.validate(request.payload,payload,error);
if (err.error==null)
{

  return "email: "+ request.payload.email + "age: "+request.payload.age +" result pass";
}
else {
    return err;
}
}
