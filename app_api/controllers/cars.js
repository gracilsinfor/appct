const mongoose = require('mongoose');
const V_mt = mongoose.model('ViaturaMt');
const V_ev = mongoose.model('ViaturaEv');

const lista_viaturas = (req, res) => { 
    res
        .status(200)
        .json({"status" : "success"});
};

const nova_viatura = (req, res) => { 
    console.log("entered cars-api")
    res
        .status(200)
        .json({"status" : "success da merda..."});
    return;
};

const adiciona_nova_viatura = (req, res) => { 
    res
        .status(200)
        .json({"status" : "success"});
};

const viatura_por_id = (req, res) => { 
    res
        .status(200)
        .json({"status" : "success x"});
    return
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
    adiciona_nova_viatura,
    viatura_por_id,
    atualiza_viatura,
    elimina_viatura
}