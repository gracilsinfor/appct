const mongoose = require('mongoose');

const options = {discriminatorKey: 'tipo'};             // para extenter modelos

/** para subdocumentos manutenção */
const manutencao_schema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    d: Date,                                      // data de entrada
    odo: Number,
    ofic: String,
    desc: String,
    d_f: Date,                                      // data de saída
    custo: Number,
});

/** para compilar o esquema Manutencao */
// const Manutencao = mongoose.model('Manutencao', manutencao_schema);

/** para documentos abastecimento */
const abastecimento_schema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    id_t: {type: mongoose.Schema.Types.ObjectId, required: true, },               // turno
    d: {type: Date, required: true, },
    odo: {type: Number, required: true, },
    custo: {type: Number, 'default': 0 },
    options
});

/** para estender o esquema Abastecimento com Abastecimento_Mt */
const abast_mt_schema = Abastecimento.discriminator('Abasteciento_Mt', new mongoose.Schema({
        litros: {type: Number, required: true, options}, 
}));

/** para estender o esquema Abastecimento com Abastecimento_Ev*/
const abast_ev_schema = Abastecimento.discriminator('Abasteciento_Ev', new mongoose.Schema({
    q_i: {type: Number, required: true, },                                                      // carga da bateria no início
    d_f: {type: Date, required: true, },                                                        // data hora no final 
    q_f: {type: Number, required: true, },
    options                                                      // carga da bateria no final
}));

/** para compilar o esquema Abastecimento */
// const Abastecimento = mongoose.model('Abastecimento', abastecimento_schema);

/** para documentos viatura */
const viatura_schema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    ev: Boolean,                                        // viatura elétrica
    n_r: { type: String, required: true },    
    desc: String,
    foto: {type: String, required: true, },
    ativa: Boolean,                                     // estado da viatura
    odo: Number,
    manut: manutencao_schema,                      // subdocumento próxima manutenção
    manuts: [manutencao_schema],                        // subdocumentos manutenção
    abasts: [abastecimento_schema],                     // subdocumentos abastecimento
    options,
});

/** para estender o esquema Viatura com Viatura_Ev */
const ev_schema = Viatura.discriminator('Viatura_Ev', new mongoose.Schema({
    q_b: Number }, options)
);

/** para compilar o esquema Viatura */
mongoose.model('Viatura', viatura_schema, 'Viaturas');




