module.exports.list = function(request, db, callback) {
	var collection = db.collection('myCollection');
	collection.find().toArray(function(err, items) {
	  callback(items);
	});
}

module.exports.train = function(request, db, callback) {
	let arrRowsWithOnlyIndependentData = [];
	let arrRowsWithOnlyDependentData = [];
	let trainingObjectToStore;
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
		    		//arrDependentData.push(dependentValue);
		    	}
		  	}
		}
		arrRowsWithOnlyIndependentData.push(arrIndependentData);
		arrRowsWithOnlyDependentData.push(arrDependentData);
	});
	trainingObjectToStore = Object.assign({}, {"independents": arrRowsWithOnlyIndependentData}, 
		{"dependents": arrRowsWithOnlyDependentData});

	db.collection('myCollection')
	.insertOne(trainingObjectToStore, function(err, result) {
	    if (err){
	    	return "error inserting document"
	    }
    	console.log("Inserted a document into the restaurants collection.");
    	callback(result);
  	});	
}