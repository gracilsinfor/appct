// para carregar formulário criar turno
const shift_c = (req, res) =>{
    res.render('turno', {title: 'Turno', sub_title: 'novo registo', rota: req.path});
};

const shift_driver=(req, res)=>{
    res.render('turno', {title: 'Turno', sub_title:'Condutor', rota: req.path})
}

const shift_car=(req, res)=>{
    res.render('turno', {title: 'Turno', sub_title:'Condutor', rota: req.path})
}

// para carregar lista de turnos 
const shifts_r = (req, res) =>{
    res.render('turnos', {title: 'Turnos', sub_title:'Condutores de turno', rota: req.path});
};

// para carregar ficha de turnos
const shift_r = (req, res) => {
    res.render('turno', { title: 'Turno', sub_title: 'ficha', rota: req.path});
};

// para carregar formulário de atualização de turno
const shift_u = (req, res)=>{
    res.render('turno', {title: 'Turno', sub_title:'atualização', rota: req.path});
};

const shift_d = (req, res) =>{
    res.render('turno', {title: 'Turno', sub_title:'eliminação', rota: req.path});
};


module.exports = {
    shift_driver,
    shift_car,
    shift_c,
    shifts_r,
    shift_r,
    shift_u,
    shift_d
};