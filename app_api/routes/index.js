const express = require('express');
const router = express.Router();

// para os controladores específicos de cada route da aplicação
const ctrl_drivers = require('../controllers/drivers');
const ctrl_cars = require('../controllers/cars');
const ctrl_shifts = require('../controllers/shifts');
const ctrl_fills = require('../controllers/fillings');
const ctrl_home = require('../controllers/home');

const ctrl_maintenances = require('../controllers/maintenances');
const { route } = require('express/lib/application');

// para página inicial
router.get('/api', ctrl_home.inicio);
router.get('/Home', ctrl_home.inicio);

// PARA TESTE
// router.get('/theme-template', ctrl_shifts.teste);

// PARA CARROS
router
    .route('/carros')                       // para o padrão route documentos carro
    .get(ctrl_cars.lista_carros)            // para listar carros
    .post(ctrl_cars.novo_carro);            // para novo carro

router
    .route('/carros/:idcarro')              // para o padrão route documento carro
    .get(ctrl_cars.ver_carro)               // para listar carro
    .put(ctrl_cars.atualiza_carro)          // para atualizar carro
    .delete(ctrl_cars.elimina_carro);       // para eliminar carro

// PARA CONDUTORES
router
    .route('/condutores')                   // para o padrão route documentos condutor
    .get(ctrl_drivers.lista_condutores)     // para listar condutores
    .post(ctrl_drivers.novo_condutor);      // para novo condutor

router
    .route('/condutores/:idcondutor')       // para o padrão route documento condutor
    .get(ctrl_drivers.ver_condutor)         // para listar condutor
    .put(ctrl_drivers.atualiza_condutor)    // para atualizar condutor
    .delete(ctrl_drivers.elimina_condutor); // para eliminar condutor

// PARA TURNOS
router
    .route('/turnos')                           // para o padrão route documentos turno
    .get(ctrl_shifts.lista_turnos)              // para listar turnos
    .post(ctrl_shifts.novo_turno);              // para novo turno

router
    .route('/turnos/:idturno')                  // para o padrão route documento turno
    .get(ctrl_shifts.ver_turno)                 // para listar turno
    .put(ctrl_shifts.atualiza_turno)            // para atualizar turno
    .delete(ctrl_shifts.elimina_turno);         // para eliminar turno

// PARA ABASTECIMENTOS
router
    .route('/carros/:idcarro/abastecimentos')             // para o padrão route subdocumentos abastecimento de um documento carro
    .post(ctrl_fills.novo_abastecimento)        // para novo abastecimento
    .get(ctrl_fills.lista_abastecimentos);      // para listar abastecimentos

router
    .route('/carros/:idcarro/abastecimento/:idabastecimento')   // para o padrão route subdocumento abastecimento de um documento carro
    .get(ctrl_fills.ver_abastecimento)                          // para listar abastecimento
    .put(ctrl_fills.atualiza_abastecimento)                     // para atualizar abastecimento
    .delete(ctrl_fills.elimina_abastecimento);                  // para eliminar abastecimento

// PARA REVISOES
router
    .route('/carros/:idcarro/revisoes')         // para o padrão route dos subdocumentos revisão de um documento carro
    .post(ctrl_maintenances.nova_revisao)       // para adicionar um novo subdocumento revisão a um documento carro
    .get(ctrl_maintenances.lista_revisoes);     // para listar os subdocumentos revisão de um documento carro

router
    .route('/carros/:idcarro/revisao/:idrevisao')   // para o padrão route de um subdocumento revisão de um documento carro
    .get(ctrl_maintenances.ver_revisao)             // para ver subdocumento revisão
    .post(ctrl_maintenances.atualiza_revisao)       // para atualizar subdocumento revisão
    .delete(ctrl_maintenances.elimina_revisao);     // para eliminar subdocumento revisão

module.exports = router;
