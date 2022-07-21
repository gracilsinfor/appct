const mongoose = require('mongoose');

const lista_turnos=(req, res)=>{
    res
        .status(200)
        .json({"status" : "success"});
};

const novo_turno=(req, res)=>{ 
    res
        .status(200)
        .json({"status" : "success"});
};

const ver_turno=(req, res)=>{ 
    res
        .status(200)
        .json({"status" : "success"});
};

const atualiza_turno=(req, res)=>{ 
    res
        .status(200)
        .json({"status" : "success"});
};


const elimina_turno=(req, res)=>{ 
    res
        .status(200)
        .json({"status" : "success"});
};

module.exports = {
    lista_turnos,
    novo_turno,
    ver_turno,
    atualiza_turno,
    elimina_turno
};