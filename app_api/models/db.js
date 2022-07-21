const mongoose = require('mongoose');
const readLine = require('readline');

// para criar a conexão com a base de dados local
const url_bd_local = 'mongodb://localhost/yaapp';
const conex_bd_local = mongoose.createConnection(url_bd_local);

// para criar conexão com base de dados remota
const url_bd_remota = 'mongodb+srv://yaappu:m2LaCXGDaFnC7XMG@cluster0.vqhol.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const conex_bd_remota = mongoose.createConnection(url_bd_remota);

if (process.env.NODE_ENV === 'production') { 
  dbURL = process.env.DB_HOST || process.env.MONGODB_URI;
};

const connect = () => {
  setTimeout(() => conex_bd_local.connect(
    url_bd_local, 
    {'useNewUrlParser': true, 
      'useCreateIndex': true, 
      'useUnifiedTopology': true 
    }),
    1000
  );
  setTimeout(() => conex_bd_local.connect(
    dbURL, 
    { useNewUrlParser: true,
       useCreateIndex: true, 
       useUnifiedTopology: true 
    })
    , 1000
  );
};

conex_bd_local.on('connected', () => {
  console.log('connected');
});

conex_bd_local.on('error', err => {
  console.log('error: ' + err);
  return connect();
});

conex_bd_local.on('disconnected', () => {
  console.log('disconnected');
});

if (process.platform === 'win32') {
  const rl = readLine.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  rl.on ('SIGINT', () => {
    process.emit("SIGINT");
  });
}

const gracefulShutdown = (msg, callback) => {
  conex_bd_local.close( () => {
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

// connect();

// require('./Carros');
// require('./Condutores');
