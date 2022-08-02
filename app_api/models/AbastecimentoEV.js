const mongoose = require('mongoose');

/** para documentos abastecimento ev */
const abastecimentoEV_schema = new mongoose.Schema({
    // _id: mongoose.Types.ObjectId, 
    id_c: {type: mongoose.Types.ObjectId, required: true },
    id_t: {type: mongoose.Types.ObjectId, required: true },
    id_v: {type: mongoose.Types.ObjectId, required: true },
    d_i: {type: Date, default: Date.now(), required: true, },
    odo: {type: Number, required: true, },
    q_i: {type: Number, required: true, },
    d_f: {type: Date,  default: Date.now(), required: true, },
    q_f: {type: Number, required: true, },
    custo: {type: Number, 'default': 0 }
});
mongoose.model('AbastEV', abastecimentoEV_schema, 'abastecimentos');
