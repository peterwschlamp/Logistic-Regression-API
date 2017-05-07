let ml = module.exports;
ml.LogisticRegression = require('../LogisticRegression');

module.exports.list = function(request, db, callback) {
	let collection = db.collection('myCollection');
	collection.find().toArray(function(err, items) {
	  callback(items);
	});
}

module.exports.train = function(request, db, callback) {
	let arrRowsWithOnlyIndependentData = [];
	let arrRowsWithOnlyDependentData = [];
	let trainingObjectToStore;
  	let objectKeys = [];
  	let objectKeysSignature = '';
  	let n_in = -1;

  	for (key in request.payload.training_set.data_rows[0]){
	    n_in++;
	    objectKeys.push(key);
	    if (key.substring(0,3) !== 'is_' ) {
	    	objectKeysSignature += key;
	    }
	}
	request.payload.training_set.data_rows.forEach((row) => {
		let arrIndependentData = [];
		let arrDependentData = [];
		for (var key in row) {
		  	if (row.hasOwnProperty(key)) {
		    	if (key.substring(0,3) !== 'is_' ) {
		    		arrIndependentData.push(row[key]);
		    	}
		    	else {
		    		if (row[key] === 0) {
		    			arrDependentData.push(0);
		    			arrDependentData.push(1);
		    		}
		    		else if (row[key] === 1) {
		    			arrDependentData.push(1);
		    			arrDependentData.push(0);
		    		}
		    	}
		  	}
		}
		arrRowsWithOnlyIndependentData.push(arrIndependentData);
		arrRowsWithOnlyDependentData.push(arrDependentData);
	});
console.log(arrRowsWithOnlyDependentData, arrRowsWithOnlyIndependentData);
  var keys = objectKeys;
	var classifier = new ml.LogisticRegression({
	  'input': arrRowsWithOnlyIndependentData,
	  'label': arrRowsWithOnlyDependentData,
	  'n_in': n_in,
	  'n_out': 2
	});
	//classifier.set('log level', 0);
	classifier.set('log level', 2);
	var training_epochs = 900, lr = 0.01;

	classifier.train({
	  'lr': lr,
	  'epochs': training_epochs
	});
	console.log(arrRowsWithOnlyDependentData);
	console.log(arrRowsWithOnlyIndependentData);
	console.log(n_in);
	console.log( classifier.getReconstructionCrossEntropy() );


	trainingObjectToStore = Object.assign({}, { "signature": objectKeysSignature }, { "keys": keys }, { "weights": classifier.W }, { "biases": classifier.b },
		{ "entropy": classifier.getReconstructionCrossEntropy() }, { "date": new Date() });

	db.collection('myCollection')
	.insertOne(trainingObjectToStore, function(err, result) {
	    if (err){
	    	return "error inserting document"
	    }
    	console.log("Inserted a document into the collection.");
    	callback(result);
  	});	
}