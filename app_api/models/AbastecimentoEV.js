const mongoose = require('mongoose');
const Abastecimento = require('./Abastecimento');

const AbastecimentoEV = Abastecimento.discriminator('AbastecimentoEV',
    new mongoose.Schema(
        {
            qi: { type: Number, required: true },
            df: { type: Date, default: Date.now(), required: true },
            qf: { type: Number, required: true }
        }, options
    )
);

module.exports = mongoose.model('AbastecimentoEV');
