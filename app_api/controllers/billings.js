const mongoose = require('mongoose');
// const abasts = mongoose.models('Viatura');

const lista_faturacoes = (req, res) => { 
    res
        .status(200)
        .json({"status" : "success"});
};

const faturacao_por_id = (req, res) => { 
    res
        .status(200)
        .json({"status" : "success"});
};

const nova_faturacao = (req, res) => { 
    res
        .status(200)
        .json({"status" : "success"});
};

const faturacoes_por_condutor = (req, res) => { 
    res
        .status(200)
        .json({"status" : "success"});
};

const atualiza_faturacao = (req, res)=>{ 
    res
        .status(200)
        .json({"status" : "success"});
};

const elimina_faturacao = (req, res) => { 
    res
        .status(200)
        .json({"status" : "success"});
}; 

const faturacao_do_turno = (req, res) => {
    res
        .status(200)
        .json({"status" : "success"});
};

module.exports = {
    lista_faturacoes,
    faturacao_por_id,
    nova_faturacao,
    faturacoes_por_condutor,
    atualiza_faturacao,
    elimina_faturacao,
    faturacao_do_turno
}