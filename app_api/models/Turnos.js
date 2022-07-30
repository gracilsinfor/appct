const mongoose = require('mongoose');

const faturacao_schema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    f_u: {type: Number, 'default': 0, },
    f_b: {type: Number, 'default': 0, }, 
    f_f: {type: Number, 'default': 0, },
    g_u: {type: Number, 'default': 0, },
    g_b: {type: Number, 'default': 0, },
    g_f: {type: Number, 'default': 0, },
});

/** para documentos Turno */
const turno_schema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    id_c: {type: mongoose.Schema.Types.ObjectId, required: true,},      // condutor
    id_v: {type: mongoose.Schema.Types.ObjectId, required: true,},      // viatura
    d_i: {type: Date, required: true, },                                // hora de início
    odo_i: Number,                                                      // odómetro no início
    d_f: Date,                                                          // hora de fim
    odo_f: Number,                                                      // odómetro no final
    fatur: [faturacao_schema],
});

/** para compilar o esquema */
mongoose.model('Turno', turno_schema, 'Turnos');
