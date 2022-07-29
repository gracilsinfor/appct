const mongoose = require('mongoose');
const readLine = require('readline');

const bd_uri_local = 'mongodb://localhost/appctdb';
const bd_uri_remote ='mongodb://yaappu:c1plerhKh2ADx8Q7@cluster0.vqhol.mongodb.net/?retryWrites=true&w=majority'

const local_host = mongoose.createConnection(bd_uri_local, {useNewUrlParser: true});
const remote_host = mongoose.createConnection(bd_uri_remote, {useNewUrlParser: true}); 


// mongoose.connect(bd_uri_local, {useNewUrlParser: true});    // para criar a conexão com a base de dados local

/** para escutar SIGINT em ambientes windows, particularmente antigos */
// if(process.platform==='win32'){
//     const rl = readLine.createInterface({
//         input: process.stdin,
//         output: process.stdout,
//     });
//     rl.on('SIGINT', () => {
//         process.emit("SIGINT");
//     });
// }

/** event listners */

// para mongoose.connect(...) (moongoose nameless connection)
// mongoose.connection.on('connected', () => {
//     console.log(`Mongoose connected to ${bd_uri_local}`);
// });
// mongoose.connection.on('error', err => {
//     console.log('Mongoose connection error: ', err);
// })
// mongoose.connection.on('disconnected', () => {
//     console.log('Mongoose disconnected');
// });
// mongoose.connection.on('disconnected', () => {
//     console.log('Mongoose disconnected');
// });

local_host.on('connected', () => {
    console.log(`Mongoose connected to ${bd_uri_local}`);
});

remote_host.on('connected', () => {
    console.log(`Mongoose connected to ${bd_uri_remote}`);
});

local_host.on('error', err => {
        console.log('Mongoose connection error: ', err);
});

remote_host.on('error', err => {
    console.log('Mongoose connection error: ', err);
});

local_host.on('disconnected', () => {
    console.log('Mongoose disconnected');
});

remote_host.on('disconnected', () => {
    console.log('Mongoose disconnected');
});


const gracefulShutdown = (msg, callback) => {
    // mongoose.connection.close( () => {
    //     console.log(`Mongoose disconnected through ${msg}`);
    //     callback();
    // });
    local_host.close( () => {
        console.log(`Mongoose disconnected through ${msg}`);
        callback();
    });
    remote_host.close( () => {
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

