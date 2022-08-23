const express = require('express');
const apic = express.Router();

const ctrl_drivers = require('../controllers/drivers');

/* rotas crud documentos condutores */

    apic.get('/:idc', ctrl_drivers.condutor_por_id);
    
    apic.post('/', ctrl_drivers.novo_condutor);

    apic.post('/:idc', ctrl_drivers.atualiza_condutor);

    apic.get('/', ctrl_drivers.lista_condutores);


module.exports = apic;
