const ctrl_viaturas = require('./teste_viaturas');
const ctrl_condutores = require('./teste_condutores');
const ctrl_turnos = require('./teste_turnos');
const request = require('request');

const filling_c = async (req, res)=>{
    const arr_titulos_abastecimento = [];
    const turno = await ctrl_turnos.ficha_turno(Math.floor(Math.random()*17));
    const viatura = await ctrl_viaturas.viatura_por_id(turno.id_viatura);
    if(viatura.ev){
        arr_titulos_abastecimento.push("id", "odometro", "inicio", "Q ini", "fim", "Q fim", "Q total", "T Q", "Custo", "Kms", "€/km", "KWh/Km");
    }else{
        arr_titulos_abastecimento.push("id", "sata", "odometro", "quant (L)", "custo", "Kms", "€/km", "L/km");
    }
    console.log(await viatura.as_object_0);
    res.render(
        'abastecimento', {
            title: 'Abastecimento', 
            sub_title: 'novo', 
            turno: await turno,
            viatura: await viatura.as_object_0,
            arr_titulos_abastecimento: arr_titulos_abastecimento,
            rota: "/Abastecimento/C", 
        });
};

const fillings_r = async (req, res) => {
    const abastecimentos = await ctrl_viaturas.lista_abastecimentos();
    const viaturas = await ctrl_viaturas.lista_matriculas();
    const condutores = await ctrl_condutores.lista_nomes();
    const tipos = [{"id": "ev", "tipo": "EV"}, {"id": "mt", "tipo": "MT"}];
    const titulos_ev = ["id", "viatura", "turno", "data", "t Q", "Q T", "custo"];
    const titulos_mt = ["id", "viatura", "turno", "data", "quant (L)", "custo"];

    res.render('abastecimentos', {
        title: 'Abastecimentos',
        sub_title: 'lista',
        abastecimentos: abastecimentos,
        condutores: condutores,
        viaturas: viaturas,
        tipos: tipos,
        titulos_ev: titulos_ev,
        titulos_mt: titulos_mt,
        rota: "/Abastecimentos",
    });
};

async function filling_r (req, res) {
    const arr_titulos_abastecimento = [];
    const viatura = await ctrl_viaturas.viatura_por_id(await req.params.idv);
    const abastecimento = await viatura.abastecimento_por_id(await req.params.id);
    const turno = await ctrl_turnos.ficha_turno(await abastecimento.id_turno);
    if(viatura.ev){
        arr_titulos_abastecimento.push("id", "odometro", "inicio", "Q ini", "fim", "Q fim", "Q total", "T Q", "Custo", "Kms", "€/km", "KWh/Km");
    }else{
        arr_titulos_abastecimento.push("id", "sata", "odometro", "quant (L)", "custo", "Kms", "€/km", "L/km");
    }
    // console.log(abastecimento.as_object);
    res.render('abastecimento', {
        title: 'Abastecimento', 
        sub_title:'ficha', 
        abastecimento: await abastecimento.as_object,
        turno: await turno,
        viatura: await viatura.as_object_0,
        arr_titulos_abastecimento: arr_titulos_abastecimento,
        rota: "/Abastecimento/idv/id", 
    });
}

async function filling_u (req, res){
    const arr_titulos_abastecimento = [];

    const viatura = await ctrl_viaturas.viatura_por_id(await req.params.idv);
    const abastecimento = await viatura.abastecimento_por_id(await req.params.id);
    const turno = await ctrl_turnos.ficha_turno(await abastecimento.id_turno);
    if(viatura.ev){
        arr_titulos_abastecimento.push("id", "Odometro", "Inicio", "Q Ini", "Fim", "Q Fim", "Q Total", "T Q", "Custo", "Kms", "€/km", "KWh/Km");
    }else{
        arr_titulos_abastecimento.push("id", "Data", "Odometro", "Quant (L)", "Custo", "Kms", "€/km", "L/km");
    }
    const id = req.params.id;
    res.render('abastecimento', {
        title: 'Abastecimento', 
        sub_title: 'atualização', 
        abastecimento: abastecimento,
        turno: turno,
        viatura: await viatura.as_object_0,
        arr_titulos_abastecimento: arr_titulos_abastecimento,
        rota: "/Abastecimento/U/idv/id", 
    });
}

// para apagar um documento abastecimento
const filling_d = (req, res) => {
    res.render('index', { title: 'filling_info' });
};

module.exports = {
    filling_c,
    fillings_r,
    filling_r,
    filling_u,
    filling_d
}