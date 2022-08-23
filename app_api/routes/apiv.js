const express = require('express');
const apiv = express.Router();

const ctrl_cars = require('../controllers/cars');

/* rotas crud documentos viaturas */

    apiv.get('/:idv', ctrl_cars.viatura_por_id);
    
    apiv.post('/', ctrl_cars.nova_viatura);

    apiv.post('/:idv', ctrl_cars.atualiza_viatura);

    apiv.get('/', ctrl_cars.lista_viaturas);


module.exports = apiv;
