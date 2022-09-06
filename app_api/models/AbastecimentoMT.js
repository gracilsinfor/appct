const mongoose = require('mongoose');
const Abastecimento = require('./Abastecimento');

const AbastecimentoMT = Abastecimento.discriminator('AbastecimentoMT',
    new mongoose.Schema(
        {
            litros: { type: Number, required: true }
        }, options
    )
);
module.exports = mongoose.model('AbastecimentoMT');
