module.exports.list = function(request, db, callback) {
	var collection = db.collection('myCollection');
	collection.find().toArray(function(err, items) {
	  callback(items);
	});
}

module.exports.train = function(request, db, callback) {
	db.collection('myCollection')
	.insertOne( request.payload.training_set, function(err, result) {
	    if (err){
	    	return "error inserting document"
	    }
    	console.log("Inserted a document into the restaurants collection.");
    	callback(result);
  	});
}