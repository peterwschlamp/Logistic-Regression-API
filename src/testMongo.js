const MongoClient = require('mongodb').MongoClient;

var db;

MongoClient.connect('mongodb://127.0.0.1:27017/myNewDatabase', (err, database) => {
  if (err) return console.log(err);
  db = database;

  var collection = db.collection('myCollection');
  collection.find().toArray(function(err, items) {
    console.log(items);
  });
})