const mongoose = require('mongoose');

/** para documentos Turno */
const turno_schema = new mongoose.Schema(
    {
        _id: mongoose.Types.ObjectId,
        id_c: {type: mongoose.Types.ObjectId, required: true, ref: 'Condutor' },
        id_v: {type: mongoose.Types.ObjectId, required: true, ref:'Viatura' },
        d_i: {type: Date, Default: Date.now(), required: true },
        odo_i: {type: Number, required: true },
        d_f: {type: Date, Default: Date.now() },
        odo_f: {type: Number, default: 0 },
        // factur: {type: mongoose.Types.ObjectId, ref: 'Faturacao'},
        // abasts: [{type: mongoose.Types.ObjectId, ref: 'Abastecimento'}]
    },
);

mongoose.model('Turno', turno_schema, 'turnos');
