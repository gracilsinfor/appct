const mongoose = require('mongoose');

/** para documentos abastecimento mt */
const abastecimentoMT_schema = new mongoose.Schema({
    // _id: mongoose.Types.ObjectId,
    id_c: {type: mongoose.Types.ObjectId, required: true },
    id_t: {type: mongoose.Types.ObjectId, required: true },
    id_v: {type: mongoose.Types.ObjectId, required: true },
    d: {type: Date, default: Date.now(), required: true },
    odo: {type: Number, required: true },
    litros: {type: Number, required: true }, 
    custo: {type: Number, required: true },
});
mongoose.model('AbastMT', abastecimentoMT_schema, 'abastecimentos');
