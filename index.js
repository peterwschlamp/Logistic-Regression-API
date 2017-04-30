const Hapi = require('hapi');
const Joi = require('joi');
const MongoClient = require('mongodb').MongoClient;
let db;

let ml = module.exports;
MongoClient.connect('mongodb://127.0.0.1:27017/myNewDatabase', (err, database) => {
	if (err) return console.log(err);
	db = database;
})
ml.LogisticRegression = require('./src/LogisticRegression');
train=require('./src/training/train');
predict=require('./src/predict/predict');

const server = new Hapi.Server();
server.connection({ port: 3000, host: 'localhost' });

server.route({
    method:'POST',
    path:'/train',
    handler:function(request,reply){
    	train.train(request, db, function(result){
    		reply (result);
    	})
    }
})

server.route({
  method:'GET',
  path:'/train/list',
  handler:function(request, reply){
    train.list(request, db, function(result){
    	reply (result);
    })
  }
})

server.route({
  method:'POST',
  path:'/train/list/{object_id}',
  handler:function(request, reply){
    train.list(request, db, function(result){
    	reply (result);
    })
  }
})

server.route({
  method:'POST',
  path:'/predict',
  handler:function(request, reply){
    predict.predict(request, db, function(result){
    	reply (result);
    })
  },
  config: {
    validate: {
      params: {
        data: Joi.object()
      }
    }
  }
})











server.route({
  method:'POST',
  path:'/train/test',
  handler:function(request,reply){
    reply (train.train(request));
  }
})

server.route({
  method:'POST',
  path:'/train/test/{object_id}',
  handler:function(request,reply){
    reply (train.train(request));
  }
})

server.route({
  method:'POST',
  path:'/predict/{id}',
  handler:function(request,reply){
    reply (predict.predict(request));
  },
  config: {
    validate: {
      params: {
        data: Joi.object()
      }
    }
  }
})

server.start((err) => {

    if (err) {
        throw err;
    }
    console.log(`Server running at: ${server.info.uri}`);
});
