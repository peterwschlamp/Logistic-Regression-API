module.exports.train = function(request, db, callback) {
	var collection = db.collection('myCollection');
	collection.find().toArray(function(err, items) {
	  callback(items);
	});
}