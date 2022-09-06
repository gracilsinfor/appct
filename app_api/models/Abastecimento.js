const mongoose = require('mongoose');
const {Schema} = mongoose;

const Turno = require('./Turno');
const Condutor = require('./Condutor');
const Viatura = require('./Viatura');

const options = { discriminatorKey: 'tipo', collection: 'Abastecimentos' };

const Abastecimento = new mongoose.model('Abastecimento',
    new mongoose.Schema(
        {
            idt: { type: Schema.Types.ObjectId, ref: 'Turno', required: true },
            idc: { type: Schema.Types.ObjectId, ref: 'Condutor', required: true },
            idv: { type: Schema.Types.ObjectId, ref: 'Viatura', required: true },
            di: { type: Date, default: Date.now(), required: true },
            odo: { type: Number, required: true },
            custo: { type: Number }
        }, options
    )
);

module.exports = mongoose.model('Abastecimento');

// const abastecimento_schema = new mongoose.Schema({
//     idt: { type: Schema.Types.ObjectId, ref: 'Turno', required: true },
//     idc: { type: Schema.Types.ObjectId, ref: 'Condutor', required: true },
//     idv: { type: Schema.Types.ObjectId, ref: 'Viatura', required: true },
//     di: { type: Date, default: Date.now(), required: true },
//     odo: { type: Number, required: true },
//     custo: { type: Number },
//     options
// });
// module.exports.Abastecimento = mongoose.model('Abastecimento', abastecimento_schema, 'Abastecimentos');