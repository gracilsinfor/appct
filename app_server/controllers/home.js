const controlador_turnos = require('./teste_turnos');
const request = require('request');

/* GET Home page */

const inicio = async (req, res)=>{
    if (req == '/Home' ){
        res.render('home', {title: 'Home'});
    }
    else{
        const dados = await controlador_turnos.turnos_ativos();
        if(dados){
            res.render('index', 
            {
                title: 'Dashboard', 
                sub_title:'turnos ativos',
                dados: dados,
                rota: req.path
            });
        }else{
            res
                .status(404)
                .json({"message": "documento não encontrado"});     
        }
    };
};

// para carregar página inicial antes de login
const start_session = (req, res) =>{
    res.render('home', {title: 'Inicio de Sessão'});
};

// para carregar a página inicial pós login
const go_home = (req, res) =>{
    res.render('index', {
        title: 'Condutores de turno', 
        sub_title:'Reabastecimentos'
    });
};

module.exports = {
    inicio,
    start_session,
    go_home
};