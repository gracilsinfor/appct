const Viaturas = require('./Viaturas');
const fs = require('fs');
const viaturas = new Viaturas;

/** para carregar viaturas */
fs.readFile('./app_server/viaturas.json', async function(err, data){
	if(err){
		return console.log(err);
	}
	const arr_viaturas = await JSON.parse(data);

	for await (const v of arr_viaturas){

		if(v._ev){
			viaturas.nova_ev([v._id, v._ev, v._matricula, v._descricao, v._imagem, v._ativa, v._kms_atuais, v._q_bateria]);
		}else{
			viaturas.nova_mt([v._id, v._ev, v._matricula, v._descricao, v._imagem, v._ativa, v._kms_atuais]);
		}
	}
	fs.close;
});

/** para carregar abastecimentos */
fs.readFile('./app_server/abastecimentos.json', async function(err, data) {
	if(err){
		return console.log(err);
	}
	const arr_abastecimentos = await JSON.parse(data);

	for await (const a of arr_abastecimentos){
		for await (const viatura of viaturas){

			if(viatura.id_viatura == a._id_viatura){

				if(viatura.ev){
					const [dia_ini, hora_ini] = await a._h_ini.split(' ');
					const [dia_fim, hora_fim] = await a._h_fim.split(' ');
					const d_ini = await (dia_ini==undefined ? 'n/d' : dia_ini);
					const h_ini = await (hora_ini==undefined ? 'n/d' : hora_ini);
					const d_fim = await (dia_fim==undefined || dia_fim=='' ? '' : dia_fim);
					const h_fim = await (hora_fim==undefined || hora_fim =='' ? '' : hora_fim);
			
					await viatura.abastecimentos.novo_ev([a._id, a._id_viatura, a._id_turno, a._id_condutor, 
						a._kms, d_ini, h_ini, a._carga_ini, d_fim, h_fim, a._carga_fim, a._euros ]);
				}else{
					const [dia, hora] = await a._data.split(' ');
					const d = await (dia==undefined ? 'n/d' : dia);
					const h = await (hora==undefined ? 'n/d' : hora);

					await viatura.abastecimentos.novo_mt([a._id, a._id_viatura, a._id_turno, a._id_condutor, 
						d, h, a._kms, a._litros, a._euros]);
				}

 				viatura.odometro = await a._kms;

				break;
			}
		}
	}
	fs.close;
});

/** para carregar manutenções */
fs.readFile('./app_server/manutencoes.json', async function(err, data) {
	if(err){
		return console.log(err);
	}
	const arr_manutencoes = await JSON.parse(data);

	for await (const m of arr_manutencoes){

		for await (const viatura of viaturas){

			if(viatura.id_viatura == m._id_viatura){
				const data = (function(str){
					return str.split('-').reverse().join('-') ;
				}(m._data));
				await viatura.manutencoes.nova([m._id, m._id_viatura, data, m._kms, m._oficina, m._descricao, m._euros]);
				break;
			}
		}
	}
	fs.close;
});

async function viatura_por_id(id_viatura){
	const viatura = await viaturas.viatura_por_id(id_viatura);
	return viatura;
}

async function abastecimentos_por_turno (turno) {
	const viatura = await viatura_por_id(await turno.id_viatura);
	const abastecimentos = await viatura.abastecimentos_por_turno(await turno);
	return abastecimentos;
}

async function lista_viaturas (err) {
	if(err){
		return console.log(err);
	}
	const arr_viaturas = await viaturas.lista_viaturas();

	return arr_viaturas;
};

async function lista_matriculas(){
	return await viaturas.lista_matriculas();
}

async function lista_abastecimentos(){

	const arr_objs_ev = [];
	const arr_objs_mt = [];
	for await(const viatura of viaturas){
		for await(const abastecimento of viatura.abastecimentos){
			const obj = await abastecimento.as_object_0;
			if(viatura.ev){
				arr_objs_ev.push(await obj);
			}
			else{
				arr_objs_mt.push(await obj);
			}
		}
	}
	const obj_ret={
		ev: arr_objs_ev,
		mt: arr_objs_mt,
	};
	return obj_ret;
}

async function lista_manutencoes(){
	const arr_manutencoes = await viaturas.lista_manutencoes();
	return arr_manutencoes;
}

async function manutencao_por_id(id_viatura, id_manutencao){
	const viatura = await viaturas.viatura_por_id(id_viatura);
	const manutencao = await viatura.manutencao_por_id(id_manutencao);
	return manutencao;
}


module.exports = {
	manutencao_por_id,
	lista_manutencoes,
	lista_matriculas,
	lista_abastecimentos,
	abastecimentos_por_turno,
	lista_viaturas,
	viatura_por_id,
}
