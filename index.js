const Hapi = require('hapi');
let ml = module.exports;
ml.LogisticRegression = require('./LogisticRegression');
getLogReg = require('./src/getLogReg');



const server = new Hapi.Server();
server.connection({ port: 3000, host: 'localhost' });

server.route({
    method: 'GET',
    path: '/hello/{user}',
    handler: function (request, reply) {
        //reply('Hello ' + encodeURIComponent(request.params.user) + '!');
        reply(getLogReg());
    }
});

server.start((err) => {

    if (err) {
        throw err;
    }
    console.log(`Server running at: ${server.info.uri}`);
});
