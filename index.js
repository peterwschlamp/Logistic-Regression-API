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

server.register(require('vision'), (err) => {
    server.views({
	    engines: {
	        html: require('handlebars')
	    },
	    relativeTo: __dirname,
	    path: './src/views',
	    layoutPath: './src/views/layout',
	    layout: 'default'
	});

});

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
  method:'GET',
  path:'/train/list/',
  handler:function(request, reply){
    train.list(request, db, function(result){
    	return reply.view('list', {result});
    })
  }
})

server.route({ 
  method:'POST',
  path:'/predict/test',
  handler:function(request,reply){
    predict.test(request.payload.input.data, db, 
    	function(result){
        let testResults= result.results.map((res) =>
          Object.assign({}, {"predicted": res.result.likelihood, 
          	"predictedRounded": Math.round(res.result.likelihood)}, 
          	{"actual": res.actual})
        );
    		reply ({"testResults": testResults});
    	},
	    function(err){
	    	reply(err);
	    }
    );
  }
})

server.route({
  method:'POST',
  path:'/predict/test/percentage',
  handler:function(request,reply){
    predict.test(request.payload.input.data, db,
      function(result){
        let count = 0;
        let match = 0;
        let percentageCorrect = result.results.forEach((res) => {
          count++;
          if ( Math.round(res.result.likelihood) === res.actual ) {
            match++;
          }
        });
        reply ({ "results": Object.assign({}, {"percentCorrect": (match/count)}, 
        	{"count": count}, {"matches": match}) });
      },
      function(err){
        reply(err);
      }
    );
  }
})

server.route({
  method:'POST',
  path:'/predict',
  handler:function(request, reply){
    predict.predict(request.payload.input.data, db, function(result){
    	reply(result.results.map((res) =>
    		Object.assign({}, {"question":res.question}, {"predictionModel": res.predictionModel},
    			{ "result": 
	    			{
	    			"dependentVariable": res.result.dependentVariable, 
	    			"likelihood": Math.round(res.result.likelihood*100)/100
	    			} 
    			}
    		)
    	));
    },
    	function(err){
    		reply(err);
    	}
    )
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
  path:'/train/list/{object_id}',
  handler:function(request, reply){
    train.list(request, db, function(result){
    	reply (result.results[0]);
    })
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
