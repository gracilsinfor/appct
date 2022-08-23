const express = require('express');
const api_registos = express.Router();

const ctrl_cars = require('../controllers/cars');

/* rotas crud documentos viaturas */

    api_registos.post('/viatura', ctrl_cars.nova_viatura);
    


module.exports = api_registos;
