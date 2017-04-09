var ml = module.exports;
ml.LogisticRegression = require('./LogisticRegression');

var x = [[1, 1, 1, 0, 0, 0], [1, 0, 1, 0, 0, 0], [1, 1, 1, 0, 0, 0], [0, 0, 1, 1, 1, 0], [0, 0, 1, 1, 0, 0], [0, 0, 1, 1, 1, 0]];
var y = [[1, 0], [1, 0], [1, 0], [0, 1], [0, 1], [0, 1]];

var classifier = new ml.LogisticRegression({
  'input': x,
  'label': y,
  'n_in': 6,
  'n_out': 2
});
//classifier.set('log level', 0);
classifier.set('log level', 0);

var training_epochs = 900, lr = 0.01;

classifier.train({
  'lr': lr,
  'epochs': training_epochs
});

x = [[1, 1, 0, 0, 0, 0], [0, 0, 0, 1, 1, 0], [1, 1, 1, 1, 1, 0]];

//console.log("Result : ", classifier.predict(x));
var result = classifier.predict(x);
console.log( "Score: ", result.map((r) => parseInt(r[0]*100)+'%') );