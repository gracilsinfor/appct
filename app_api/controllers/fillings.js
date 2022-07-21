const mongoose = require('mongoose');

const lista_abastecimentos=(req, res)=>{ 
    res
        .status(200)
        .json({"status" : "success"});
};

const novo_abastecimento=(req, res)=>{ 
    res
        .status(200)
        .json({"status" : "success"});
};

const ver_abastecimento=(req, res)=>{ 
    res
        .status(200)
        .json({"status" : "success"});
};

const atualiza_abastecimento=(req, res)=>{ 
    res
        .status(200)
        .json({"status" : "success"});
};

const elimina_abastecimento=(req, res)=>{ 
    res
        .status(200)
        .json({"status" : "success"});
};

module.exports = {
    lista_abastecimentos,
    novo_abastecimento,
    ver_abastecimento,
    atualiza_abastecimento,
    elimina_abastecimento
};