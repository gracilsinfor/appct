const mongoose = require('mongoose');
// const manut = mongoose.model('Viatura');

const lista_manutencoes = (req, res) => { 
    res
        .status(200)
        .json({"status" : "success"});
};

const manutencao_por_id = (req, res) => { 
    res
        .status(200)
        .json({"status" : "success"});
};

const nova_manutencao = (req, res) => { 
    res
        .status(200)
        .json({"status" : "success"});
};

const manutencoes_por_viatura = (req, res) => { 
    res
        .status(200)
        .json({"status" : "success"});
};

const manutencao_da_viatura = (req, res) => { 
    res
        .status(200)
        .json({"status" : "success"});
};

const atualiza_manutencao = (req, res) => { 
    res
        .status(200)
        .json({"status" : "success"});
};

const elimina_manutencao = (req, res) => { 
    res
        .status(200)
        .json({"status" : "success"});
};

module.exports = {
    lista_manutencoes,
    manutencao_por_id,
    nova_manutencao,
    manutencoes_por_viatura,
    manutencao_da_viatura,
    atualiza_manutencao,
    elimina_manutencao
}
