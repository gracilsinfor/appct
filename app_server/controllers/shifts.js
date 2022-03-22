const ctrl_testes = require('./testes');


const teste = (req, res) =>{
    res.render('theme-template', {title: 'Teste', sub_title: 'template', rota: req.path, dados: ctrl_testes.dados_teste});
};


// para carregar formulário criar turno
const shift_c = (req, res) =>{
    res.render('turno', {title: 'Turno', sub_title: 'novo registo', rota: req.path, dados: ctrl_testes.dados_teste});
};

// para carregar lista de turnos 
const shifts_r = (req, res) =>{
    res.render('turnos', {title: 'Pares de Turno', sub_title:'lista', rota: req.path, dados: ctrl_testes.dados_teste});
};

// para carregar ficha de turnos
const shift_r = (req, res) => {
    res.render('turno', { title: 'Turno', sub_title: 'ficha', rota: req.path});
};

// para carregar formulário de atualização de turno
const shift_u = (req, res)=>{
    res.render('turno', {title: 'Turno', sub_title:'atualização', rota: req.path, dados: ctrl_testes.dados_teste});
};

const shift_d = (req, res) =>{
    res.render('turno', {title: 'Turno', sub_title:'eliminação', rota: req.path});
};


module.exports = {
    shift_c,
    shifts_r,
    shift_r,
    shift_u,
    shift_d,
    teste
};