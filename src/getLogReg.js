let ml = module.exports;
ml.LogisticRegression = require('./LogisticRegression');

module.exports = function getLogReg(independents, dependents, predictTheseInputs){
	//var x = [[1, 1, 1, 0, 0, 0], [1, 0, 1, 0, 0, 0], [1, 1, 1, 0, 0, 0], [0, 0, 1, 1, 1, 0], [0, 0, 1, 1, 0, 0], [0, 0, 1, 1, 1, 0]];
	//var y = [[1, 0], [1, 0], [1, 0], [0, 1], [0, 1], [0, 1]];

	var x = independents;
	var y = dependents;

	var classifier = new ml.LogisticRegression({
	  'input': x,
	  'label': y,
	  'n_in': 4,
	  'n_out': 2
	});
	classifier.set('log level', 0);
	//classifier.set('log level', 2);

	var training_epochs = 900, lr = 0.01;

	classifier.train({
	  'lr': lr,
	  'epochs': training_epochs
	});


	//The following will be our equation created from above training. No need to store any data!
  //console.log("W : " + classifier.W);
  //console.log("b : " + classifier.b);

	/*


	FROM JUNKU:

	 After training, you can get your logistic regression classifier's weight matrix W and bias vector b of output layer.
	 console.log("W : " + classifier.W);
	 console.log("b : " + classifier.b);

	 Also, you can initialize weight matrix W and bias vector b with certain value before training classifier. (before calling train method of classifier. Default is zero matrix/vector.)
	 classifier.W = initial_W;
	 classifier.b = initial_b;

	 classifier.train({...});


	*/





	///////////////////////////////////////NOW PREDICT////////////////////////////////////////////////////////

	//x = [[1, 1, 0, 0, 0, 0], [0, 0, 0, 1, 1, 0], [1, 1, 1, 1, 1, 0]];
	x = [predictTheseInputs];//expects an array of arrays which is why i wrapped []

	//console.log("Result : ", classifier.predict(x));
	var result = classifier.predict(x);
	//console.log( "Score: ", result.map((r) => parseInt(r[0]*100)+'%') );
	return "Scores: " + result.map((r) => parseInt(r[0]*100)+'%');
}