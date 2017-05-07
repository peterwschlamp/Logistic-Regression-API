LogisticRegression = require('../LogisticRegression');

module.exports.test = function(request, db, callback, error) {
  let actuals = [];
  let tests = [];
  request.forEach((question) => {
    for(let key in question){
      if (key.substring(0,3) === 'is_'){
        actuals.push( question[key] );
        delete question[key];
        tests.push(question);
      }
    }
  })

  let questions = request;
  let questionsArray = [];
  let objectKeysSignature = '';
  let dependentVariable = '';
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
      error("Can't find training set using signature " + objectKeysSignature);
      return;
    }
    dependentVariable = items[0].keys.filter((key) =>
      key.substring(0,3) === 'is_' 
    );
    let W=items[0].weights;
    let b=items[0].biases;
    let classifier = new LogisticRegression({});
    let results = classifier.predictWithWeights(questionsArray, W, b);
    callback(Object.assign({},{"actuals": actuals},{"results": results.map((result, index) =>
      Object.assign({},
        { "question": questions[index] }, 
        {"predictionModel": objectKeysSignature}, 
        {"result":
          { 
            "dependentVariable": dependentVariable[0], 
            "likelihood": result[0] 
          } 
        }
      )
    )}));
  });
  //return Object.assign({}, {"tests": module.exports.predict(tests, db, callback, error), "actuals": actuals } );
}

module.exports.predict = function(request, db, callback, error) {
  let questions = request;
  let questionsArray = [];
  let objectKeysSignature = '';
  let dependentVariable = '';
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
      error("Can't find training set using signature " + objectKeysSignature);
      return;
    }
    dependentVariable = items[0].keys.filter((key) =>
      key.substring(0,3) === 'is_' 
    );
    let W=items[0].weights;
    let b=items[0].biases;
    let classifier = new LogisticRegression({});
    let results = classifier.predictWithWeights(questionsArray, W, b);
    callback({"results": results.map((result, index) =>
      Object.assign({},{ "question": questions[index] }, {"predictionModel": objectKeysSignature}, 
        {"result":
          { 
            "dependentVariable": dependentVariable[0], 
            "likelihood": result[0] 
          } 
        }
      )
    )});
  });
}
