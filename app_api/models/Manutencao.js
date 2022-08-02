const mongoose = require('mongoose');

/** para documentos manutenção */
const manutencao_schema = new mongoose.Schema({
    // _id: mongoose.Types.ObjectId,
    id_v: {type: mongoose.Types.ObjectId, ref: 'Viatura', required: true },
    marc: {type: Boolean, default: true},
    d: {type: Date, required: true},
    odo: {type: Number, required: true},
    ofic: {type: String, default: "Oficina"},
    desc: {type: String, default: "Trabalhos realizados"},
    d_f: {type: Date, default: this.d },
    custo: Number,
});

mongoose.model('Manutencao', manutencao_schema, 'manutencoes');
