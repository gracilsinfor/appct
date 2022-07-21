const mongoose = require('mongoose');
const { boolean } = require('webidl-conversions');

/** para documentos condutor */
const condutor_schema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    nome: { type: String, required: true },
    nif: Number,
    telef: String,
    email: String,
    entrada: Date,
    kms: Number,
    ativo: { type: Boolean, required: true },
    imagem: String,
    faturacao: [faturacao_schema]
});
/** para compilar o esquema condutor */
const Condutor = mongoose.model('Condutor', condutor_schema);

const faturacao_schema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    id_t: mongoose.Schema.Types.ObjectId,                       // turno
    id_c: mongoose.Schema.Types.ObjectId,                       // condutor
    f_u: Number,
    f_b: Number,
    f_f: Number,
    g_u: Number,
    g_b: Number,
    g_f: Number,
});


const credenciais_schema = new mongoose.Schema({
    telefone: String,
    email: String,
    nome:   { "type": "string", "required":"true" },
    pin:    { "type": "string", "required":"true" },
    role:   { "type": "string", "required":"true" }
});


