const Viatura = require('./Viatura');
// const Manutencoes = require('./Manutencoes');
// const Abastecimentos = require('./Abastecimentos');

class Viatura_MT extends Viatura{

    constructor(id, ev, matricula, descricao, imagem, ativa, odometro){
        super(id, ev, matricula, descricao, imagem, ativa, odometro=0);
    }

    get as_object_0() {
        return super.as_object_0;
    }

    get as_object() {
        return super.as_object;
    }

    async abastecimentos_por_turno (turno) {
        const arr_abastecimentos = await this.abastecimentos.abastecimentos_por_turno(await turno.id_turno);
        const arr_objs = [];
        let odom_anterior = await turno.odom_ini;
        for ( let i = 0; i < arr_abastecimentos.length; i++){
            const abastecimento = await arr_abastecimentos[i];
            const kms_percorridos = await abastecimento.conta_kms(odom_anterior);
            const custo_km = await abastecimento.custo_km(odom_anterior);
            const consumo_km = await abastecimento.consumo_km(odom_anterior);
            odom_anterior = await abastecimento.odometro;
            const obj = {
                ...abastecimento.as_object,
                "kms_percorridos": kms_percorridos,
                "custo_km": custo_km,
                "consumo_km": consumo_km,
            };
            arr_objs.push(await obj);
        }
        return arr_objs;   
    }

    async totais_abastecimentos(id_turno){
        const obj = {
            "custo_total": super.custo_total_turno(id_turno),
        }
        return obj;
    }
}

module.exports = Viatura_MT