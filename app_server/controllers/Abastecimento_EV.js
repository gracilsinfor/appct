const Abastecimento = require('./Abastecimento');

class Abastecimento_EV extends Abastecimento{
    #_h_ini;
    #_q_ini;
    #_h_fim;
    #_q_fim;

    constructor(id, id_viatura, id_turno, id_condutor, kms, h_ini, carga_ini, h_fim = 0, carga_fim = 0, euros = 0){

        super(id, id_viatura, id_turno, id_condutor, h_ini, kms, euros);

        this.#_h_ini = h_ini;
        this.#_q_ini = carga_ini;
        this.#_h_fim = h_fim;
        this.#_q_fim = carga_fim;
    }

    set h_ini_ (hi) {this.#_h_ini = hi;}
    set q_ini_ (qi) {this.#_q_ini = qi;}
    set h_fim_ (hf) {this.#_h_fim = hf;}
    set q_fim_ (qf) {this.#_q_fim = qf;}

    get h_ini () {return this.#_h_ini; }
    get q_ini () {return this.#_q_ini; }
    get h_fim () {return this.#_h_fim; }
    get q_fim () {return this.#_q_fim; }

    get tempo_de_carga () {
        if(this.#_h_ini && this.#_h_fim){
            const horas = Math.floor((Date.parse(this.#_h_fim) - Date.parse(this.#_h_ini))/1000/60/60); 
            const minutos = ((Date.parse(this.#_h_fim) - Date.parse(this.#_h_ini))/1000/60) % 60;
            // console.log(this.#_h_fim);
            return (minutos < 10 ? horas + ":0" + minutos : horas + ":" + minutos);
        }else{
            return "00:00"; 
        }         
     }

    get total_carga () { return (this.q_fim - this.q_ini); }

    get as_object_0 (){
        const obj ={
            "id_abastecimento": super.id_abastecimento,
            "id_viatura": super.id_viatura,
            "id_turno": super.id_turno,
            // "id_condutor": super.id_condutor,
            // "data": super.data,
            // "odometro": super.odometro,
            "h_ini": this.h_ini,
            // "q_ini": this.q_ini,
            // "h_fim": this.h_fim,
            // "q_fim": this.q_fim,
            "t_carga": this.tempo_de_carga,
            "carga": this.total_carga,
            "custo": super.custo,
        }
        return obj;
    }

    get as_object (){
        const obj ={
            "id_abastecimento": super.id_abastecimento,
            "id_viatura": super.id_viatura,
            "id_turno": super.id_turno,
            "id_condutor": super.id_condutor,
            "data": super.data,
            "odometro": super.odometro,
            "custo": super.custo,
            "h_ini": this.h_ini,
            "q_ini": this.q_ini,
            "h_fim": this.h_fim,
            "q_fim": this.q_fim,
            "t_carga": this.tempo_de_carga,
            "carga": this.total_carga,
        }
        return obj;
    }

    async consumo_km (q_bateria, leitura_anterior) {
        const kwh_km = (q_bateria * this.total_carga / 100) / (super.odometro - leitura_anterior);
        return kwh_km.toFixed(2) ;
    }

};

module.exports = Abastecimento_EV
