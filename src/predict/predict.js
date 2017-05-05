LogisticRegression = require('../LogisticRegression');

module.exports.predict = function(request, db, callback) {
  var predictThis = request.payload.input.data;
  var collection = db.collection('myCollection');
  collection.find().toArray(function(err, items) {
    let W=items[0].weights;
    let b=items[0].biases;

    var classifier = new LogisticRegression({});
    var result = classifier.predictWithWeights(predictThis, W, b);
    callback( result[0][0] );
  });
}
