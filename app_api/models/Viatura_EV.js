const mongoose = require('mongoose');

const Viatura = require('./Viatura');

const ViaturaEV = Viatura.discriminator('ViaturaEV',
    new mongoose.Schema(
        {
            qb: { type: Number},
        }
    )
);

module.exports = mongoose.model('ViaturaEV');


