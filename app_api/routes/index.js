const express = require('express');
const router = express.Router();

const ctrl_cars = require('../controllers/cars');

/* rotas crud documentos viaturas */
{
    router
        .route('/viaturas')
        .get(ctrl_cars.lista_viaturas)
        .post(ctrl_cars.nova_viatura)
        ;

    router
        .route('/viaturas/:idviatura')
        .get(ctrl_cars.viatura_por_id)
        .put(ctrl_cars.atualiza_viatura)
        .delete(ctrl_cars.elimina_viatura)
        ;
}

/** rotas crud subdocumentos manutenção  */
{
    router
        .route('/viaturas/:idviatura/manutencoes')
        .post(ctrl_cars.nova_manutencao)
        ;
    router
        .route('/viaturas/:idviatura/manutencoes/:idmanutencao')
        .get(ctrl_cars.manutencao_por_id)
        .put(ctrl_cars.atualiza_manutencao)
        .delete(ctrl_cars.elimina_manutencao)
        ;
}

module.exports = router;
