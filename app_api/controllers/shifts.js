const mongoose = require('mongoose');
const Shift = mongoose.model('Turno');

const lista_turnos = (req, res) => { 
    res
        .status(200)
        .json({"status" : "success"});
};

const novo_turno = (req, res) => {
    res
        .status(200)
        .json({"status" : "success"});
};

const turno_por_id = (req, res) => {
    res
        .status(200)
        .json({"status" : "success"});
};

const atualiza_turno = (req, res) => {
    res
        .status(200)
        .json({"status" : "success"});
};

const elimina_turno = (req, res) => {
    res
        .status(200)
        .json({"status" : "success"});
};

module.exports = {
    lista_turnos,
    novo_turno,
    turno_por_id,
    atualiza_turno,
    elimina_turno
}