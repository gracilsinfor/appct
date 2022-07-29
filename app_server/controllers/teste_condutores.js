const Condutores = require('./Condutores');

// const ctrl_turnos = require('./teste_turnos');

const fs = require('fs');
const condutores = new Condutores();

/** para carregar condutores */
fs.readFile('./app_server/condutores.json', async function(err, data) {
    if(err){
      return console.log(err);
    }
    const array_c = await JSON.parse(data);

    for await(const c of array_c){
        const novo_c = [c._id, c._nome, c._nif, c._telefone, c._email, 
            c._data_entrada, c._ativo, c._kms_feitos, c._imagem];

        condutores.novo(novo_c);
    }
    fs.close;
});
  
async function condutor_por_id (id_condutor) {
    const condutor = await condutores.condutor_por_id(id_condutor);
    return condutor;
};

async function lista_condutores(){
    const lista = [];
    for await(const condutor of condutores){
        const ref_condutor = await condutor.as_object;
        lista.push(ref_condutor);
    }
    return lista;
};

async function lista_nomes () {
    return condutores.lista_nomes();
};

const ficha_condutor = async id_condutor =>{
    const condutor = await condutor_por_id(id_condutor);
    return condutor.as_object;    
};

async function faturacao_para_turnos(arr_turnos){
    const condutor = await condutores.condutor_por_id(arr_turnos[0].id_condutor);
    const turnos_com_faturacao = [];
    for await (const turno of arr_turnos){
        const faturacao = await condutor.faturacao_do_turno(turno.id_turno);
        turnos_com_faturacao.push({ 
            ...turno,
            faturacao,
        });
    }
    return turnos_com_faturacao;
}

async function faturacao_do_turno(id_condutor, id_turno){
    const condutor = await condutores.condutor_por_id(id_condutor);
    const faturacao = await condutor.faturacao_do_turno(id_turno);
    return await faturacao; 
}

async function faturacao_total(id_condutor){
    const faturacao_total = await condutores.faturacao_total(id_condutor);
    return await faturacao_total;
}

module.exports = {
    faturacao_para_turnos,
    faturacao_total,
    faturacao_do_turno,
    lista_nomes,
    ficha_condutor,
    lista_condutores,
    condutor_por_id,

};