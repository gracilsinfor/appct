const mongoose = require('mongoose');

const bd_uri = 'mongodb://localhost/appctdb';

if(process.env.NODE_ENV==='production'){
    bd_uri ='mongodb://yaappu:c1plerhKh2ADx8Q7@cluster0.vqhol.mongodb.net/?retryWrites=true&w=majority'
}

const host_connect = mongoose.createConnection(bd_uri, {useNewUrlParser: true});

/** event listners */

// /** para o SIGINT em ambientes windows, particularmente antigos */
// if(process.platform==='win32'){
//     const rl = readLine.createInterface({
//         input: process.stdin,
//         output: process.stdout,
//     });
//     rl.on('SIGINT', () => {
//         process.emit("SIGINT");
//     });
// }

host_connect.on('connected', () => {
    console.log(`Mongoose connected to ${bd_uri}`);
});

host_connect.on('error', err => {
        console.log('Mongoose connection error: ', err);
});

host_connect.on('disconnected', () => {
    console.log('Mongoose disconnected');
});

const gracefulShutdown = (msg, callback) => {
    host_connect.close( () => {
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

require('./AbastecimentoEV');
require('./AbastecimentoMT');
require('./Condutor');
require('./Faturacao');
// require('./Manutencao');
require('./Turno');
require('./Viatura_MT');
require('./Viatura_EV');