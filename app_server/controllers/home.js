const controlador_turnos = require('./teste_turnos');
const request = require('request');

const api_options = {
    server: 'http://localhost:3000'
};
if(process.env.NODE_ENV === 'production'){
    api_options.server = 'http://nameless-river-78172.herokuapp.com'
}

/* GET Home page */

const inicio = async (req, res)=>{
    res.render('test_sass_bs', {
        title: 'Turnos ativos', 
        pge_header: {
            title:'APPCT-Dashboard'
        },
    });
};

// const inicio = async (req, res)=>{
//     const path = '/api/Dashboard';
//     const request_opts = {
//         url: `${api_options.server}${path}`,
//         method: 'GET',
//         json: {},
//         qs: {}
//     };
//     request(
//         request_opts,
//         (err, response, body) => {
//             const dados = body;
//             _render_home(req, res, body);
//         }
//     );
// };

const _render_home = function(req, res, response_body){
    let mensagem = null;
    if(!(response_body instanceof Array)){
        mensagem = 'erro lookup da API';
        response_body = [];
    }else{
        if(!response_body.length){
            mensagem = 'Presentemente sem turnos ativos!'
        }
    }
    res.render('index', {
        title: 'Turnos ativos', 
        pge_header: {
            title:'APPCT-Dashboard'
        },
        dados: response_body,
        rota: req.path,
        mensagem: mensagem
    });
}

module.exports = {
    inicio
};