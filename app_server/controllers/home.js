/* GET Home page */

const inicio = (req, res)=>{
    if (req == '/Home' ){
        res.render('home', {title: 'Home'});
    }
    else{
        res.render('index', {title: 'Dashboard'});
    };
};

// para carregar página inicial antes de login
const start_session = (req, res) =>{
    res.render('home', {title: 'Inicio de Sessão'});
};

// para carregar a página inicial pós login
const go_home = (req, res) =>{
    res.render('index', {pagina: 'Dashboard', title: 'Condutores de turno', sub_title:'Reabastecimentos'});
};

module.exports = {
    inicio,
    start_session,
    go_home
};