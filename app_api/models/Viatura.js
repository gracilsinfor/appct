const mongoose = require('mongoose');

const manutencao_schema = new mongoose.Schema({
    est: {type: String, enum: ['Agendada', 'Em curso', 'Realizada'], required: true},
    di : {type: Date, required: true},
    odo: {type: Number, required: true},
    ofc: {type: String },
    dsc: {type: String },
    df : {type: Date },
    cst: {type: Number},
});

const viatura_schema = new mongoose.Schema({
    ev  : {type: Boolean, default: false },
    qb  : {type: Number},
    nr  : { type: String, required: true, unique: true },
    dsc : {type: String, required: true },
    fto : {type: String, required: true, },
    est : {type: Boolean, default: true},
    odo : {type: Number, required: true },
    abst: {type: [mongoose.Types.ObjectId] },
    ftr : {type: [mongoose.Types.ObjectId] },
    mnt : {type: manutencao_schema},
    mnts: {type: [manutencao_schema] },
    
});

mongoose.model('Viatura', viatura_schema, 'Viaturas');

/** campos manutenção
    _id estado d odo ofic desc d_f custo
*/

/** campos viatura
    _id ev q_b n_r desc foto ativa odo manut manuts 
*/