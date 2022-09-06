
/** para configurações de ambiente  */
const server_opts = { server: 'http://localhost:3000' }

if (process.env.NODE_ENV === 'production') { 
    server_opts.server = 'http://nameless-river-78172.herokuapp.com' 
};

module.exports = server_opts;