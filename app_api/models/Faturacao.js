const mongoose = require('mongoose');
const faturacao_schema = new mongoose.Schema({
    // "_id": mongoose.Types.ObjectId,
    id_c: {type: mongoose.Types.ObjectId, ref: 'Condutor', required: true },
    id_t: {type: mongoose.Types.ObjectId, ref: 'Turno', required: true},
    f_u: {type: Number, 'default': 0 },
    f_b: {type: Number, 'default': 0 }, 
    f_f: {type: Number, 'default': 0 },
    g_u: {type: Number, 'default': 0 },
    g_b: {type: Number, 'default': 0 },
    g_f: {type: Number, 'default': 0 },
});
mongoose.model('Faturacao', faturacao_schema, 'faturacoes');