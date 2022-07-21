const mongoose = require('mongoose');

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

const ver_condutor=(req, res)=>{
    res
        .status(200)
        .json({"status" : "success"});
};

const atualiza_condutor=(req, res)=>{ 
    res
    .status(200)
    .json({"status" : "success"});
};

const elimina_condutor=(req, res)=>{ 
    res
    .status(200)
    .json({"status" : "success"});
};


module.exports = {
    lista_condutores,
    novo_condutor,
    ver_condutor,
    atualiza_condutor,
    elimina_condutor
};