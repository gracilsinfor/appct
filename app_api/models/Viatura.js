const mongoose = require('mongoose');

const options = {discriminatorKey: 'tipo'};             // para extenter modelos

/** para documentos viatura */
const viatura_schema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    ev: Boolean,                                        // viatura elétrica
    matricula: { type: String, required: true },    
    descricao: String,
    imagem: {type: String, required: true, },
    ativa: Boolean,                                     // estado da viatura
    odometro: Number,
    prox_manut: manutencao_schema,                      // subdocumento próxima manutenção
    manuts: [manutencao_schema],                        // subdocumentos manutenção
    abasts: [abastecimento_schema],                     // subdocumentos abastecimento
    options
});
/** para compilar o esquema Viatura */
const Viatura = mongoose.model('Viatura', viatura_schema);

/** para estender o esquema Viatura com Viatura_Ev */
const ev_schema = Viatura.discriminator('Viatura_Ev', 
    new mongoose.Schema({ bateria: Number }, options)
);

/** para documentos manutenção */
const manutencao_schema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    // id_v: mongoose.Schema.Types.ObjectId,           // viatura
    d_e: Date,                                      // data de entrada
    odo: Number,
    oficina: String,
    descricao: String,
    d_s: Date,                                      // data de saída
    obs: String
});
/** para compilar o esquema Manutencao */
const Manutencao = mongoose.model('Manutencao', manutencao_schema);

/** para documentos abastecimento */
const abastecimento_schema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    // id_v: mongoose.Schema.Types.ObjectId,               // viatura
    id_t: mongoose.Schema.Types.ObjectId,               // turno
    id_c: mongoose.Schema.Types.ObjectId,               // condutor
    odo: Number,
    custo:Number,
    options
});
/** para compilar o esquema Abastecimento */
const Abastecimento = mongoose.model('Abastecimento', abastecimento_schema);

/** para estender o esquema Abastecimento com Abastecimento_Mt*/
const abast_mt_schema = Abastecimento.discriminator('Abasteciento_Mt',
    new mongoose.Schema({
        data: Date,
        litros: Number}, 
        options)
);

/** para estender o esquema Abastecimento com Abastecimento_Ev*/
const abast_ev_schema = Abastecimento.discriminator('Abasteciento_Ev',
    new mongoose.Schema({
        h_i: Date,                                      // data hora no início
        q_i: Number,                                    // carga da bateria no início
        h_f: Date,                                      // data hora no final 
        q_f: Number},                                   // carga da bateria no final
        options)
);
