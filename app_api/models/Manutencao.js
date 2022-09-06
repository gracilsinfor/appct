const mongoose = require('mongoose');

const manutencao_schema = new mongoose.Schema({
    estd: {type: String, enum: ['Agendada', 'Em curso', 'Realizada'], required: true},
    di : {type: Date, required: true},
    odo: {type: Number, required: true},
    ofc: {type: String },
    dsc: {type: String },
    df : {type: Date },
    cst: {type: Number},
});

mongoose.model('Manutencao', manutencao_schema, 'Manutencoes');


