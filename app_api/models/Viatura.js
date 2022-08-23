const mongoose = require('mongoose');

const manutencao_schema = new mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    estado: {type: String, enum: ['Agendada', 'Em curso', 'Realizada'], required: true},
    d: {type: Date, required: true},
    odo: {type: Number, required: true},
    ofic: {type: String },
    desc: {type: String },
    d_f: {type: Date },
    custo: Number,
});

const viatura_schema = new mongoose.Schema({
    ev: {type: Boolean, default: false },
    q_b: {type: Number},
    n_r: { type: String, required: true, unique: true },
    desc: {type: String, required: true },
    foto: {type: String, required: true, },
    ativa: {type: Boolean, default: true},
    odo: {type: Number, required: true },
    manut: {type: manutencao_schema },
    manuts: {type: [manutencao_schema], default: () => ({}) },
    
});

mongoose.model('Viatura', viatura_schema, 'Viaturas');

/** campos manutenção
    _id estado d odo ofic desc d_f custo
*/

/** campos viatura
    _id ev q_b n_r desc foto ativa odo manut manuts 
*/