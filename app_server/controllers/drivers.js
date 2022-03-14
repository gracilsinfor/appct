// para carregar formulário de criar motorista
const driver_c = (req, res) =>{
    res.render('motorista', {title: 'Condutor', sub_title: 'novo registo', rota: req.path});
}

// para carregar página da ficha de motorista
const driver_r = (req, res) => {
    res.render('motorista', {title: 'Condutor', sub_title: 'ficha', rota: req.originalUrl});
};

// para carregar lista de motoristas
const drivers_r = (req, res) =>{
    res.render('motoristas', {title: 'Condutores', sub_title: 'lista'});
};

// para carregar formulário de atualizar motorista 
const driver_u = (req, res)=>{
    res.render('motorista', {title: 'Condutor', sub_title: 'atualização', rota: req.path});
};

// para apagar motorista 
const driver_d = (req, res) =>{
    res.render('motorista', {title: 'Condutor', sub_title:'eliminação', rota: req.path});
};

module.exports = {
    driver_c,
    drivers_r,
    driver_r,
    driver_u,
    driver_d
};