const mongoose = require('mongoose');
const readLine = require('readline');
const bd_uri_local = 'mongodb://localhost/appctdb';

mongoose.connect(bd_uri_local, {useNewUrlParser: true});    // para criar a conexão com a base de dados local

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
mongoose.connection.on('connected', () => {
    console.log(`Mongoose connected to ${bd_uri_local}`);
});

mongoose.connection.on('error', err => {
    console.log('Mongoose connection error: ', err);
})

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


require('./Turnos');

// para criar conexão com base de dados remota
// const bd_uri_remote = 'mongodb+srv://yaappu:m2LaCXGDaFnC7XMG@cluster0.vqhol.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
// const conex_bd_remota = mongoose.createConnection(bd_uri_remote);

// if (process.env.NODE_ENV === 'production') { 
//   dbURL = process.env.DB_HOST || process.env.MONGODB_URI;
// };

// const connect = () => {
//   setTimeout(() => local_bd_connection.connect(
//     bd_uri_local, 
//     {'useNewUrlParser': true, 
//       'useCreateIndex': true, 
//       'useUnifiedTopology': true 
//     }),
//     1000
//   );
//   setTimeout(() => local_bd_connection.connect(
//     dbURL, 
//     { useNewUrlParser: true,
//        useCreateIndex: true, 
//        useUnifiedTopology: true 
//     })
//     , 1000
//   );
// };

// local_bd_connection.on('connected', () => {
//   console.log('connected');
// });

// local_bd_connection.on('error', err => {
//   console.log('error: ' + err);
//   return connect();
// });

// local_bd_connection.on('disconnected', () => {
//   console.log('disconnected');
// });


// connect();
