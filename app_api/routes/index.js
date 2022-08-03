const express = require('express');
const router = express.Router();

// para os controladores específicos de cada route da aplicação
const ctrl_billings = require('../controllers/billings');
const ctrl_cars = require('../controllers/cars');
const ctrl_drivers = require('../controllers/drivers');
const ctrl_fills = require('../controllers/fillings');
const ctrl_repairs = require('../controllers/repairs');
const ctrl_shifts = require('../controllers/shifts');

const ctrl_home = require('../controllers/home');

/* Routes crud viaturas */
{
router
    .route('/Viaturas')
    .get(ctrl_cars.lista_viaturas)
    ;

router 
    .route('/Viaturas/C')
    .get(ctrl_cars.nova_viatura)
    .post(ctrl_cars.adiciona_nova_viatura)
    ;

router
    .route('/Viaturas/:idviatura')
    .get(ctrl_cars.viatura_por_id)
    .put(ctrl_cars.atualiza_viatura)
    .delete(ctrl_cars.elimina_viatura)
    ;
}

module.exports = router;
