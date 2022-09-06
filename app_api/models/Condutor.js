const mongoose = require('mongoose');
const {Schema} = mongoose;

const Turno = require('./Turno');
const Faturacao = require('./Faturacao');

/** para documentos condutor */
const condutor_schema = new mongoose.Schema({
    nome: { type: String, required: true },
    nif: { type: Number, required: true },
    tel: String,
    email: String,
    entrd: Date,
    kms: Number,
    estd: { type: Boolean, required: true },
    fto: { type: String, required: true},
    trns: [{ type: Schema.Types.ObjectId, ref: 'Turno'}],
    ftrs: [{ type: Schema.Types.ObjectId, ref: 'Faturacao' }]
});

mongoose.model('Condutor', condutor_schema, 'Condutores');


// nome nif tel email entrada kms ativo foto
