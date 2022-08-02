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


// const { route } = require('express/lib/application');

// página inicial
{
router
    .route('/Dashboard')
    .get(ctrl_home.inicio)
    ;
}

/* Routes crud abastecimentos */
{
    router
    .route('/Abastecimentos')
    .get(ctrl_fills.lista_abastecimentos)
    ;
router
    .route('Abastecimentos/:idabastecimento')
    .get(ctrl_fills.abastecimento_por_id)
    ;
router
    .route('/Abstecimentos/:idviatura')
    .post(ctrl_fills.novo_abastecimento)
    .get(ctrl_fills.abastecimentos_por_viatura)
    ;
router
    .route('/Abastecimentos/:idabastecimento/Viaturas/:idviatura')
    .get(ctrl_fills.abastecimento_da_viatura)
    .put(ctrl_fills.atualiza_abastecimento)
    .delete(ctrl_fills.elimina_abastecimento)
    ;
router
    .route('/Abastecimentos/Turnos/:idturno')
    .get(ctrl_fills.abastecimentos_do_turno)
}

/* Routes crud condutores */
{
router
    .route('/Condutores')
    .get(ctrl_drivers.lista_condutores)
    .post(ctrl_drivers.novo_condutor)
    ;

router
    .route('/Condutores/:idcondutor')
    .get(ctrl_drivers.condutor_por_id)
    .put(ctrl_drivers.atualiza_condutor)
    .delete(ctrl_drivers.elimina_condutor)
    ;
}

/** Routes crud faturações */
{
    router
        .route('/Faturacoes')
        .get(ctrl_billings.lista_faturacoes)
        ;
    router
        .route('/Faturacoes/:idfaturacao')
        .get(ctrl_billings.faturacao_por_id)
        ;
    router
        .route('/Faturacoes/Condutor/:idcondutor/Turno/:idturno')
        .post(ctrl_billings.nova_faturacao)
        ;
}

/* Routes crud manutenções */
{
router
    .route('/Manutencoes')
    .get(ctrl_repairs.lista_manutencoes)
    ;
router
    .route('Manutencoes/:idmanutencao')
    .get(ctrl_repairs.manutencao_por_id)
    ;
router
    .route('/Manutencoes/:idviatura')
    .post(ctrl_repairs.nova_manutencao)
    .get(ctrl_repairs.manutencoes_por_viatura)
    ;
router
    .route('/Manutencoes/:idmanutencao/Viaturas/:idviatura')
    .get(ctrl_repairs.manutencao_da_viatura)
    .post(ctrl_repairs.atualiza_manutencao)
    .delete(ctrl_repairs.elimina_manutencao)
    ;
}

/* Routes crud turnos */
{
router
    .route('/Turnos')
    .get(ctrl_shifts.lista_turnos)
    .post(ctrl_shifts.novo_turno)
    ;

router
    .route('/Turnos/:idturno')
    .get(ctrl_shifts.turno_por_id)
    .put(ctrl_shifts.atualiza_turno)
    .delete(ctrl_shifts.elimina_turno)
    ;
}

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
