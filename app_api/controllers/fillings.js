const mongoose = require('mongoose');
// const abasts = mongoose.models('Viatura');

const lista_abastecimentos = (req, res) => { 
    res
        .status(200)
        .json({"status" : "success"});
};

const abastecimento_por_id = (req, res) => { 
    res
        .status(200)
        .json({"status" : "success"});
};

const novo_abastecimento = (req, res) => { 
    res
        .status(200)
        .json({"status" : "success"});
};

const abastecimentos_por_viatura = (req, res) => { 
    res
        .status(200)
        .json({"status" : "success"});
};

const abastecimento_da_viatura = (req, res) => { 
    res
        .status(200)
        .json({"status" : "success"});
};

const atualiza_abastecimento=(req, res)=>{ 
    res
        .status(200)
        .json({"status" : "success"});
};

const elimina_abastecimento = (req, res) => { 
    res
        .status(200)
        .json({"status" : "success"});
}; 

const abastecimentos_do_turno = (req, res) => {
    res
        .status(200)
        .json({"status" : "success"});
};

module.exports = {
    lista_abastecimentos,
    abastecimento_por_id,
    novo_abastecimento,
    abastecimentos_por_viatura,
    abastecimento_da_viatura,
    atualiza_abastecimento,
    elimina_abastecimento,
    abastecimentos_do_turno
}