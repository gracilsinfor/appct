const ctrl_testes = require('./testes');


const filling_c = (req, res)=>{
    res.render('abastecimento', {title: 'Abastecimento', sub_title: 'novo', rota: req.path, dados: ctrl_testes.dados_teste});
};

// para carregar página com a lista de abastecimentos 
const fillings_r = (req, res) =>{
    res.render('abastecimentos', {title: 'Abastecimentos', sub_title: 'últimos', rota: req.path, dados: ctrl_testes.dados_teste});
};

// para carregar página com a informação de um abastecimento
const filling_r = (req, res) => {
    res.render('abastecimento', { title: 'Abastecimento', sub_title:'ficha' , rota: req.path, dados: ctrl_testes.dados_teste});
};

// para carregar página com formulário abastecimento
const filling_u = (req, res)=>{
    res.render('abastecimento', {title: 'Abastecimento', sub_title: 'alterar', rota: req.path, dados: ctrl_testes.dados_teste});
};

const filling_d = (req, res) => {
    res.render('index', { title: 'filling_info' });
};

module.exports = {
    filling_c,
    fillings_r,
    filling_r,
    filling_u,
    filling_d
};