const mongoose = require('mongoose');
// const viat = mongoose.model('Viatura');

const lista_viaturas = (req, res) => { 
    res
        .status(200)
        .json({"status" : "success"});
};

const nova_viatura = (req, res) => { 
    res
        .status(200)
        .json({"status" : "success"});
};

const viatura_por_id = (req, res) => { 
    res
        .status(200)
        .json({"status" : "success"});
};

const atualiza_viatura = (req, res) => { 
    res
        .status(200)
        .json({"status" : "success"});
};

const elimina_viatura = (req, res) => { 
    res
        .status(200)
        .json({"status" : "success"});
};

module.exports = {
    lista_viaturas,
    nova_viatura,
    viatura_por_id,
    atualiza_viatura,
    elimina_viatura
}