// para carregar formulário de criar carro
const car_c = (req, res) =>{
    res.render('carro', {title: 'Carro', sub_title: 'Novo registo', rota: req.path})
}

// para carregar página da ficha do carro
const car_r = (req, res) =>{
    res.render('carro', {title: 'Carro', sub_title: 'Ficha', rota: req.originalUrl});
};

// para carregar lista de carros
const cars_r = (req, res) => {
    res.render('carros', { title: 'Carros', sub_title: 'Lista', rota: req.path });
};

// para carregar formulário de atualizar carro
const car_u = (req, res)=>{
    res.render('carro', {title:'Carro', sub_title: 'Atualização', rota: req.path});
};

// para apagar carro
const car_d =(req,res)=>{
    res.render('carro', {title: 'Carro'});
}

module.exports = {
    car_c,
    car_r,
    cars_r,
    car_u,
    car_d
};