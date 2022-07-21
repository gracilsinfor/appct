const mongoose = require('mongoose');

/** para documentos Turno */
const turno_schema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    id_c: mongoose.Schema.Types.ObjectId,       // condutor
    id_v: mongoose.Schema.Types.ObjectId,       // viatura
    h_i: {type: Date, required: true, },        // hora de início
    odo_i: Number,                              // odómetro no início
    h_f: Date,                                  // hora de fim
    odo_f: Number,                              // odómetro no final
});