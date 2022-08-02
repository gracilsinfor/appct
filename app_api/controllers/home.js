const req = require('express/lib/request');
const mongoose = require('mongoose');
const Shift = mongoose.model('Turno');

const _build_dashboard = function(req, res, resultados, stats){
    const turnos_ativos =[];
    resultados.forEach((doc) => {
        turnos_ativos.push({
            "_id": doc._id,
            "id_c": doc.id_c,
            "nome_condutor": doc.nome_condutor,
            "kms_feitos": doc.kms_feitos,
            "foto_condutor": doc.foto_condutor,
            "id_v": doc.id_v,
            "ev": doc.ev,
            "n_r": doc.n_r,
            "foto_viatura": doc.foto_viatura
        })
        return turnos_ativos;
    });
}

const inicio = (req, res) => {
    const turnos_ativos = _build_dashboard
    res
        .status(200)
        .json({"status" : "success"})
};

module.exports = {
    inicio
}