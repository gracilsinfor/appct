const express = require('express');
const router = express.Router();

const ctrl_drivers = require('../controllers/drivers');
const ctrl_cars = require('../controllers/cars');
const ctrl_shifts = require('../controllers/shifts');
const ctrl_fills = require('../controllers/fillings');
const ctrl_repairs = require('../controllers/repairs');

const ctrl_home = require('../controllers/home');
const { route } = require('express/lib/application');
const req = require('express/lib/request');

/* GET home page. */
router.get('/', ctrl_home.inicio);
// router.get('/Home', ctrl_home.inicio);

/* Routes crud viaturas */
router.get('/Viatura/C', ctrl_cars.car_c);
router.get('/Viaturas', ctrl_cars.cars_r);
router.get('/Viatura/:id', ctrl_cars.car_r);
router.get('/Viatura/U/:id', ctrl_cars.car_u);
router.get('/Viatura/D/:id', ctrl_cars.car_d);

/* Routes crud condutores */
router.get('/Condutor/C', ctrl_drivers.driver_c);
router.get('/Condutores', ctrl_drivers.drivers_r);
router.get('/Condutor/:id', ctrl_drivers.driver_r);
router.get('/Condutor/U/:id', ctrl_drivers.driver_u);
router.get('/Condutor/D/:id', ctrl_drivers.driver_d);
// router.get('/Condutor/:id/Credenciais/U', ctrl_drivers.driver_credenciais);

/* Routes crud turnos */
router.get('/Turno/C', ctrl_shifts.shift_c);
router.get('/Turnos', ctrl_shifts.shifts_r);
router.get('/Turno/:id', ctrl_shifts.shift_r);
router.get('/Turno/U/:id', ctrl_shifts.shift_u);
router.get('/Turno/U/A/:id', ctrl_shifts.shift_ua);
router.get('/Turno/D', ctrl_shifts.shift_d);

/* Routes crud abastecimentos */
router.get('/Abastecimento/C', ctrl_fills.filling_c);
router.get('/Abastecimentos', ctrl_fills.fillings_r);
router.get('/Abastecimento/:idv/:id', ctrl_fills.filling_r);  
router.get('/Abastecimento/U/:idv/:id', ctrl_fills.filling_u);
router.get('/Abastecimento/D', ctrl_fills.filling_d);

/* Routes crud manutenções */
router.get('/Manutencao/C/:idv', ctrl_repairs.repair_c);
router.get('/Manutencoes', ctrl_repairs.repairs_r);
router.get('/Manutencao/:idv/:id', ctrl_repairs.repair_r);  
router.get('/Manutencao/U/:idv/:id', ctrl_repairs.repair_u);
router.get('/Manutencao/D', ctrl_repairs.repair_d);

// função    callback evocada na versão 2
// const homepage_controller = (req, res) =>{
//   res.render('index', {title: 'Express'});
// };

// versão 2 evoca uma callback com nome
// router.get('/', homepage_controller);

// versão 1 
// o controlador é uma callback anónima 
// chamada a renderizar a página index quando esta é pedida
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

module.exports = router;
