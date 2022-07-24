const Turnos = require('./Turnos');
// const Turno = require('./Turno');
// const Condutor = require('./Condutor');
// const Viatura = require('./Viatura');

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
        const [dia_ini, hora_ini] = await t._h_ini.split(' ');
        const [dia_fim, hora_fim] = await t._h_fim.split(' ');
        const d_ini = await (dia_ini==undefined ? 'n/d' : dia_ini);
        const h_ini = await (hora_ini==undefined ? 'n/d' : hora_ini);
        const d_fim = await (dia_fim==undefined || dia_fim=='' ? '' : dia_fim);
        const h_fim = await (hora_fim==undefined || hora_fim =='' ? '' : hora_fim);
        console.log({
            d_ini,
            h_ini,
            d_fim,
            h_fim,
        })
        turnos.novo([ t._id, t._id_condutor, t._id_viatura, t._km_ini, d_ini, h_ini, t._km_fim, d_fim, h_fim]);
    }
    fs.close;
  });
  
const heads_turno = ['Turno', 'Carro', 'Ini', 'Fim', 'Grats'];
const heads_turno_sum = ['Turno', 'Carro', 'Ini', 'Fim', 'Grat U', 'Grat B', 'Grat F', 'Total Grat'];


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

    // console.log(await obj);
    return await obj;
}

async function abastecimentos_por_turno(turno){
    // console.log(turno);
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