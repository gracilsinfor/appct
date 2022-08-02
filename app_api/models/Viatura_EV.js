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

/** para documentos viatura */
const viaturaEV_schema = new mongoose.Schema({
    // _id: mongoose.Types.ObjectId,
    ev: Boolean,
    q_b: {type: Number, required: true, default: 50 },
    n_r: { type: String, required: true },    
    desc: String,
    foto: {type: String, required: true, },
    ativa: Boolean,
    odo: Number,
    manut: {type: manutencao_schema},
    manuts: [manutencao_schema],
});
mongoose.model('ViaturaEv', viaturaEV_schema, 'Viaturas');




