const mongoose = require('mongoose');
const { Schema } = mongoose;

const Abastecimento = require('./Abastecimento');
const Faturacao = require('./Faturacao');
const Mautencao = require('./Manutencao');

const options = { discriminatorKey: 'tipo', collection: 'Viaturas' };

const Viatura = mongoose.model('Viatura', 
    new mongoose.Schema(
        {
            nr: { type: String, required: true, unique: true },
            dsc: { type: String, required: true },
            fto: { type: String, required: true, },
            estd: { type: Boolean, default: true },
            odo: { type: Number, required: true },
            abst: [{ type: Schema.Types.ObjectId, ref: 'Abastecimento' }],
            ftr: [{ type: Schema.Types.ObjectId, ref: 'Faturacao' }],
            mnt: { type: Schema.Types.ObjectId, ref: 'Manutencao' },
            mnts: [{ type: Schema.Types.ObjectId, ref: 'Manutencao' }]
        }, options
    )
);

module.exports = mongoose.model('Viatura');




// const viatura_schema = new mongoose.Schema({
//     nr:   {  type: String, required: true, unique: true },
//     dsc:  {  type: String, required: true },
//     fto:  {  type: String, required: true, },
//     est:  {  type: Boolean, default: true },
//     odo:  {  type: Number, required: true },
//     abst: [{ type: mongoose.Types.ObjectId, ref: Abastecimento }],
//     ftr:  [{ type: mongoose.Types.ObjectId, ref: Faturacao }],
//     mnt:  {  type: mongoose.Types.ObjectId, ref: Manutencao },
//     mnts: [{ type: mongoose.Types.ObjectId, ref: Manutencao }],
//     options
// });

// mongoose.model('Viatura', viatura_schema, 'Viaturas');
