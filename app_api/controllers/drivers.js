const mongoose = require('mongoose');
// const condut = mongoose.model('Condutor')

const lista_condutores = (req, res) => { 
    res
        .status(200)
        .json({"status" : "success"});
};

const novo_condutor = (req, res) => { 
    res
        .status(200)
        .json({"status" : "success"});
};

const condutor_por_id = (req, res) => { 
    res
        .status(200)
        .json({"status" : "success"});
};

const atualiza_condutor = (req, res) => { 
    res
        .status(200)
        .json({"status" : "success"});
};

const elimina_condutor = (req, res) => { 
    res
        .status(200)
        .json({"status" : "success"});
};


module.exports = {
    lista_condutores,
    novo_condutor,
    condutor_por_id,
    atualiza_condutor,
    elimina_condutor
}