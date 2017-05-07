LogisticRegression = require('../LogisticRegression');

module.exports.predict = function(request, db, callback) {
  let questions = request.payload.input.data;
  let questionsArray = [];
  let objectKeysSignature = '';
  for (key in questions[0]){
    objectKeysSignature += key;
  }
  questions.forEach((question) => {
      let questionArray = [];
      for(let key in question) {
        questionArray.push(question[key])
      }
      questionsArray.push(questionArray);
  })

  let collection = db.collection('myCollection');
  collection.find({signature: objectKeysSignature}).toArray(function(err, items) {
    if (err || items.length === 0) {
      callback({"results": "Can't find training set using" + objectKeysSignature});
      return;
    }
    console.log("Using document " + items[0].keys);
    let W=items[0].weights;
    let b=items[0].biases;
    let classifier = new LogisticRegression({});
    let results = classifier.predictWithWeights(questionsArray, W, b);
    console.log(results);
    callback({"results": results.map((result, index) =>
      Object.assign({},{ "question": questions[index] } , { "result": result[0] })
    )});
  });
}
