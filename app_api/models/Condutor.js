const mongoose = require('mongoose');

/** para documentos condutor */
const condutor_schema = new mongoose.Schema({
    // _id: mongoose.Types.ObjectId,
    nome: { type: String, required: true },
    nif: {type: Number, required: true },
    tel: String,
    email: String,
    entrada: Date,
    kms: Number,
    ativo: { type: Boolean, required: true },
    foto: String,
});

mongoose.model('Condutor', condutor_schema, 'Condutores');



