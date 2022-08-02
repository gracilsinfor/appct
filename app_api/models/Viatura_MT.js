const mongoose = require('mongoose');

const manutencao_schema = new mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    estado: {type: String, enum: ['Agendada', 'Realizada'], required: true},
    d: {type: Date, required: true},
    odo: {type: Number, required: true},
    ofic: {type: String },
    desc: {type: String },
    d_f: {type: Date },
    custo: Number,
});
/** para documentos viatura mt */
const viaturaMT_schema = new mongoose.Schema({
    // _id: mongoose.Types.ObjectId,
    ev: {type: Boolean, default: false },
    n_r: { type: String, required: true },
    desc: {type: String, required: true },
    foto: {type: String, required: true, },
    ativa: {type: Boolean, default: true},
    odo: {type: Number, required: true },
    manut: {type: manutencao_schema },
    manuts: {type: [manutencao_schema], default: () => ({}) },
});

mongoose.model('ViaturaMt', viaturaMT_schema, 'viaturas');
