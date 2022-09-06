const mongoose = require('mongoose');
const {Schema} = mongoose;

const Condutor = require('./Condutor');
const Viatura = require('./Viatura');
const Faturacao = require('./Faturacao');

/** para documentos Turno */
const turno_schema = new mongoose.Schema(
    {
        idc: {type: Schema.Types.ObjectId, required: true, ref: 'Condutor' },
        idv: {type: Schema.Types.ObjectId, required: true, ref: 'Viatura' },
        idf: {type: Schema.Types.ObjectId, required: true, ref: 'Faturacao' },
        di: {type: Date, Default: Date.now(), required: true },
        odoi: {type: Number, required: true },
        df: {type: Date, Default: Date.now() },
        odof: {type: Number, default: 0 },
    }
);

mongoose.model('Turno', turno_schema, 'Turnos');
