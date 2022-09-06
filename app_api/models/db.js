const mongoose = require('mongoose');

const bd_uri = 'mongodb://127.0.0.1:27017/appctdb';

if(process.env.NODE_ENV==='production'){
    bd_uri ='mongodb://yaappu:c1plerhKh2ADx8Q7@cluster0.vqhol.mongodb.net/?retryWrites=true&w=majority'
}

mongoose.connect(bd_uri, {useNewUrlParser: true, useUnifiedTopology: true});

/** event listners */

mongoose.connection.on('connected', () => {
    console.log(`Mongoose connected to ${bd_uri}`);
});

mongoose.connection.on('error', err => {
        console.log('Mongoose connection error: ', err);
});

mongoose.connection.on('disconnected', () => {
    console.log('Mongoose disconnected');
});

const gracefulShutdown = (msg, callback) => {
    mongoose.connection.close( () => {
        console.log(`Mongoose disconnected through ${msg}`);
        callback();
    });
};

// For nodemon restarts
process.once('SIGUSR2', () => {
    gracefulShutdown('nodemon restart', () => {
        process.kill(process.pid, 'SIGUSR2');
    });
});

// For app termination
process.on('SIGINT', () => {
    gracefulShutdown('app termination', () => {
        process.exit(0);
    });
});

// For Heroku app termination
process.on('SIGTERM', () => {
    gracefulShutdown('Heroku app shutdown', () => {
        process.exit(0);
    });
});

// require('./AbastecimentoEV');
// require('./AbastecimentoMT');
require('./Condutor');
require('./Faturacao');
require('./Manutencao');
require('./Turno');
require('./Viatura');
// require('./Viatura_MT');
// require('./Viatura_EV');