const ctrl_turnos = require('./teste_turnos');
const ctrl_condutores = require('./teste_condutores');
const ctrl_viaturas = require('./teste_viaturas');
const request = require('request');

// para carregar um novo subdocumento turno
const shift_c = async (req, res) =>{
    const viaturas = await ctrl_viaturas.lista_matriculas();
    const data_now = new Date(Date.now());
    const dia_now = data_now.toISOString().substring(0,10);
    const hora_now =data_now.toISOString().substring(11,16);
    // dia_now = dia_now.replace(',','').substring(0, 16);
    res.render('turno', {
        title: 'Turno', 
        sub_title: 'novo',
        dia_now: dia_now, 
        hora_now: hora_now,
        viaturas: viaturas,
        rota: '/Turno/C', 
    });
};

// para carregar lista de subdocumentos turno 
async function shifts_r (req, res) {
    const turnos = await ctrl_turnos.lista_turnos();
    if(turnos){
        res.render('turnos', {
            title: 'Turnos', 
            sub_title:'lista', 
            dados: turnos,
            rota: '/Turnos'
        });
    }else{
        res
            .status(404)
            .json({"message": "documento não encontrado"});            
    }
};

async function shift_r (req, res) {
    const turno = await ctrl_turnos.ficha_turno(req.params.id);
    const faturacao = await ctrl_condutores.faturacao_do_turno(await turno.id_turno, await turno.id_condutor);

    res.render('turno', { 
        title: 'Turno', 
        sub_title: 'ficha', 
        turno: turno,
        faturacao: faturacao,
        rota: '/Turno/id',
    });
}

async function shift_u (req, res) {
    const turno = await ctrl_turnos.ficha_turno(req.params.id);
    const faturacao = await ctrl_condutores.faturacao_do_turno(await turno.id_turno, await turno.id_condutor);
    const arr_titulos_abastecimento = [];
    if(turno.ev){
        arr_titulos_abastecimento.push("id", "Odometro", "Inicio", "Q Ini", "Fim", "Q Fim", "Q Total", "T Q", "Custo", "Kms", "€/km", "KWh/Km");
    }else{
        arr_titulos_abastecimento.push("id", "Data", "Odometro", "Quant (L)", "Custo", "Kms", "€/km", "L/km");
    }
    res.render('turno', {
        title: 'Turno', 
        sub_title:'atualização', 
        turno: turno,
        faturacao: faturacao,
        arr_titulos_abastecimento: arr_titulos_abastecimento,
        rota: '/Turno/U/id', 
    });
}

const shift_ua = async (req, res) => {
    const turno = await ctrl_turnos.ficha_turno(req.params.id);
    const arr_titulos_abastecimento = [];
    if(turno.ev){
        arr_titulos_abastecimento.push("id", "Odometro", "Inicio", "Q Ini", "Fim", "Q Fim", "Q Total", "T Q", "Custo", "Kms", "€/km", "KWh/Km");
    }else{
        arr_titulos_abastecimento.push("id", "Data", "Odometro", "Quant (L)", "Custo", "Kms", "€/km", "L/km");
    }
    res.render('turno', {
        title: 'Abastecimentos', 
        sub_title:'atualização', 
        turno: turno,
        arr_titulos_abastecimento: arr_titulos_abastecimento,
        rota: '/Turno/id/U/A', 
    });
}

const shift_d = (req, res) =>{
    res.render('turno', {
        title: 'Turno', 
        sub_title:'eliminação', 
        rota: req.path
    });
};


module.exports = {
    shift_ua,
    shift_c,
    shifts_r,
    shift_r,
    shift_u,
    shift_d
}