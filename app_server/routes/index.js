const express = require('express');
const router = express.Router();

const ctrl_drivers = require('../controllers/drivers');
const ctrl_cars = require('../controllers/cars');
const ctrl_shifts = require('../controllers/shifts');
const ctrl_fills = require('../controllers/fillings');
const ctrl_home = require('../controllers/home');
const { route } = require('express/lib/application');
// const ctrl_main=require('../controllers/main');

/* GET home page. */
router.get('/', ctrl_home.go_home);
router.get('/home', ctrl_home.start_session);

// router.get('/', ctrl_main.index); // versão (m)vc, a callback está definida num módulo 

/* Routes para operações crud em carros */
router.get('/Car/C', ctrl_cars.car_c);
router.get('/Cars', ctrl_cars.cars_r);
router.get('/Car', ctrl_cars.car_r);
router.get('/Car/U', ctrl_cars.car_u);
router.get('/Car/D', ctrl_cars.car_d);

/* Routes para operações crud em condutores */
router.get('/Driver/C', ctrl_drivers.driver_c);
router.get('/Drivers', ctrl_drivers.drivers_r);
router.get('/Driver', ctrl_drivers.driver_r);
router.get('/Driver/U', ctrl_drivers.driver_u);
router.get('/Driver/D', ctrl_drivers.driver_d);

/* Routes para operações crud em turnos */
router.get('/Shift/Driver', ctrl_shifts.shift_driver);
router.get('/Shift/Car', ctrl_shifts.shift_car);
router.get('/Shift/C', ctrl_shifts.shift_c);
router.get('/Shifts', ctrl_shifts.shifts_r);
router.get('/Shift', ctrl_shifts.shift_r);
router.get('/Shift/U', ctrl_shifts.shift_u);
router.get('/Shift/D', ctrl_shifts.shift_d);

/* Routes para operações crud em abastecimentos */
router.get('/Filling/C', ctrl_fills.filling_c);
router.get('/Fillings', ctrl_fills.fillings_r);
router.get('/Filling', ctrl_fills.filling_r);  
router.get('/Filling/U', ctrl_fills.filling_u);
router.get('/Filling/D', ctrl_fills.filling_d);

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
