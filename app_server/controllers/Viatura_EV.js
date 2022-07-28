const Viatura = require('./Viatura');

class Viatura_EV extends Viatura{
    #_q_b;

    constructor(id, ev, matricula, descricao, imagem, ativa, odometro, q_bateria=0){
        
        super(id, ev, matricula, descricao, imagem, ativa, odometro);
        
        this.#_q_b = q_bateria;
    }

    set q_bateria (qb) { this.#_q_b = qb; }
    get q_bateria () {return this.#_q_b;}

    get as_object_0(){
        const obj = {
            "id_viatura": super.id,
            "ev": super.ev,
            "descricao_viatura": super.descricao,
            "matricula": super.matricula,
            "odometro": super.odometro,
            "imagem_viatura": super.imagem,
            "ativa": super.ativa,  
            "q_bateria": this.q_bateria,
        }
        return obj;
    }

    get as_object(){
        const obj = {
            ...this.as_object_0,
            "data_ultima_manutencao": super.data_ultima_manutencao,
            "kms_ultima_manutencao": super.kms_ultima_manutencao,
            "data_proxima_manutencao": super.data_proxima_manutencao,
            "kms_proxima_manutencao": super.kms_proxima_manutencao,
        }
        return obj;
    }
    
    async abastecimentos_por_turno (turno) {
        const arr_abastecimentos = await this.abastecimentos.abastecimentos_por_turno(await turno.id_turno);
        const arr_objs = [];
        let odom_anterior = await turno.odom_ini;
        for ( let i = 0; i < arr_abastecimentos.length; i++){
            const abastecimento = await arr_abastecimentos[i];
            const kms_percorridos = await abastecimento.conta_kms(odom_anterior);
            const custo_km = await abastecimento.custo_km(odom_anterior);
            const consumo_km = await abastecimento.consumo_km(odom_anterior, this.q_bateria);
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

    async soma_tempo_q_turno(id_turno){
        const abastecimentos_turno = [];
        let horas = 0;
        let minutos = 0;
        for await(const abastecimento of this.abastecimentos){
            if(abastecimento.id_turno == id_turno){
                // abastecimentos_turno.push(await abastecimento);
                horas += Math.floor( 
                    (Date.parse(await abastecimento.d_fim + " " + await abastecimento.h_fim) - Date.parse(await abastecimento.d_ini + " " + await abastecimento.h_ini) )/1000/60/60); 
                minutos += ( (Date.parse(await abastecimento.d_fim + " " + await abastecimento.h_fim) - Date.parse(await abastecimento.d_ini + " " + await abastecimento.h_ini))/1000/60) % 60;
            }
        }

        if(minutos > 59){
            horas += Math.floor(minutos / 60);
            minutos = minutos % 60;
        }
        
        const str = (minutos < 10 ? horas + ":0" + minutos : horas + ":" + minutos);

        return str;
    }

    async totais_abastecimentos(id_turno){
        const total_q = await this.soma_tempo_q_turno(id_turno); 
        const total_custo = super.custo_total_turno(id_turno);
        const obj = {
            "tempo_total_q": total_q,
            "custo_total": total_custo,
        }
        return obj;
    }
}

module.exports = Viatura_EV