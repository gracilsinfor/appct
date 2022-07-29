const Turnos = require('./Turnos');

const ctrl_condutor = require('./teste_condutores');
const ctrl_viatura = require('./teste_viaturas');

const fs = require('fs');

const turnos = new Turnos();

/** para carregar turnos */
fs.readFile('./app_server/turnos.json', async function(err, data) {
    if(err){
        return console.log(err);
    }
    const array_t = await JSON.parse(data);
    for await(const t of array_t){
        const d_ini = await (t.d_ini=="" ? 'n/d' : d_ini);
        const d_fim = await (t.d_fim=="" || 'n/d' ? '' : t.d_fim);
    }
    fs.close;
  });
  
/** para carregar faturações  */
fs.readFile('./app_server/faturacoes.json', async function(err, data) {
    if(err){
        return console.log(err);
    }
    const array_f = await JSON.parse(data);

    for await(const f of array_f){
        
        const nova_f = [f._id, f._id_turno, 
            f._f_u, f._f_b, f._f_f, f._g_u, f._g_b, f._g_f];

        for await (const turno of turnos){
            if(turno.id_turno == f._id_turno){
                turno.fatur(nova_f);
                break;
            }
        }
    }
    fs.close;
});

async function turnos_ativos () {
    const arr_obj_turno = [];
    for await(const t of turnos){
        if(t.h_fim === ''){
            const obj_condutor = await ctrl_condutor.condutor_por_id(t.id_condutor);
            const obj_viatura = await ctrl_viatura.viatura_por_id(t.id_viatura);
            const obj = {
                ...t.as_object_0,
                ...obj_condutor.as_object_0,
                ...obj_viatura.as_object_0,
            }
            arr_obj_turno.push(obj);
        }
    }
    return arr_obj_turno;
};

async function lista_turnos () {
    const arr_obj_turno = [];
    for await(const t of turnos){
        const obj_condutor = await ctrl_condutor.condutor_por_id(t.id_condutor);
        const obj_viatura = await ctrl_viatura.viatura_por_id(t.id_viatura);
        const obj = {
            ...t.as_object_0,
            ...obj_condutor.as_object_0,
            ...obj_viatura.as_object_0,
        }
        arr_obj_turno.push(obj);
    }
    return arr_obj_turno;
}

async function turno_por_id (id_turno) {
    const turno = await turnos.turno_por_id(id_turno);
    return turno.as_object;
}

async function ficha_turno (id_turno) {

    const turno = await turnos.turno_por_id(id_turno);
    const condutor = await ctrl_condutor.condutor_por_id(await turno.id_condutor);
    const viatura = await ctrl_viatura.viatura_por_id(await turno.id_viatura);
    const abastecimentos_turno = await viatura.abastecimentos_por_turno(await turno.as_object_0);

    const totais = await viatura.totais_abastecimentos(id_turno);

    const obj = {
        ...turno.as_object,
        ...condutor.as_object_0,
        ...viatura.as_object_0,
        "abastecimentos": abastecimentos_turno,
        ...totais,
    }
    return await obj;
}

async function abastecimentos_por_turno(turno){
    const abastecimentos = await ctrl_viatura.abastecimentos_por_turno(await turno);
    return abastecimentos;
}

async function turnos_condutor(id_condutor){
    const arr_objs_turno = await turnos.turnos_por_condutor(id_condutor);
    return arr_objs_turno;
}

module.exports = {
    turnos_condutor,
    ficha_turno,
    abastecimentos_por_turno,
    turno_por_id,
    lista_turnos,
    turnos_ativos,
}