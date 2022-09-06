const mongoose = require('mongoose');
const Condutor = require('./Condutor');
const Viatura = require('./Viatura');

const faturacao_schema = new mongoose.Schema({
    idc: {type: mongoose.Schema.Types.ObjectId, ref: 'Condutor', required: true },
    idv: {type: mongoose.Schema.Types.ObjectId, ref: 'Viatura', required: true},
    f_u: {type: Number, 'default': 0 },
    f_b: {type: Number, 'default': 0 }, 
    f_f: {type: Number, 'default': 0 },
    g_u: {type: Number, 'default': 0 },
    g_b: {type: Number, 'default': 0 },
    g_f: {type: Number, 'default': 0 }
});
mongoose.model('Faturacao', faturacao_schema, 'Faturacoes');