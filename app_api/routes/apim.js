const express = require('express');
const apim = express.Router();

const ctrl_repairs = require('../controllers/repairs');

apim.get('/', ctrl_repairs.lista_manutencoes)

module.exports = apim;