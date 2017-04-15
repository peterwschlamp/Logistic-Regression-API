const Hapi = require('hapi');
let ml = module.exports;
ml.LogisticRegression = require('./src/LogisticRegression');
train=require('./src/training/train');
predict=require('./src/predict/predict');

const server = new Hapi.Server();
server.connection({ port: 3000, host: 'localhost' });

server.route({
    method:'POST',
    path:'/train',
    handler:function(request,reply){
       reply (train.train(request));
    }

})

server.route({
    method:'POST',
    path:'/predict',
    handler:function(request,reply){
        reply (predict.predict(request));
    }

})

server.start((err) => {

    if (err) {
        throw err;
    }
    console.log(`Server running at: ${server.info.uri}`);
});
