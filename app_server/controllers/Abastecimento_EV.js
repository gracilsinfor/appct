const Abastecimento = require('./Abastecimento');

class Abastecimento_EV extends Abastecimento{
    #_q_ini;
    #_d_fim;
    #_q_fim;

    constructor(id, id_turno, kms, dia, carga_ini, d_fim=0, carga_fim = 0, euros = 0){

        super(id, id_turno, dia, hora, kms, euros);

        this.#_q_ini = carga_ini;
        this.#_d_fim = d_fim;
        this.#_q_fim = carga_fim;
    }

    set d_ini_ (di) {super.dia(di);}
    set q_ini_ (qi) {this.#_q_ini = qi;}
    set d_fim_ (df) {this.#_d_fim = df;}
    set q_fim_ (qf) {this.#_q_fim = qf;}

    get d_ini () {return super.dia;}
    get q_ini () {return this.#_q_ini; }
    get d_fim () {return this.#_d_fim; }
    get q_fim () {return this.#_q_fim; }

    get tempo_de_carga () {
        if(this.h_ini && this.h_fim){
            const horas = Math.floor((Date.parse(this.d_fim) - Date.parse(this.h_ini))/1000/60/60); 
            const minutos = ((Date.parse(this.h_fim) - Date.parse(this.h_ini))/1000/60) % 60;
            return (minutos < 10 ? horas + ":0" + minutos : horas + ":" + minutos);
        }else{
            return "00:00"; 
        }         
     }

    get total_carga () { return (this.q_fim - this.q_ini); }

    get as_object_0 (){
        const obj ={
            "id_abastecimento": super.id_abastecimento,
            "id_turno": super.id_t,
            "d_ini": super.dia,
            "t_carga": this.tempo_de_carga,
            "carga": this.total_carga,
            "custo": super.custo,
        }
        return obj;
    }

    get as_object (){
        const obj ={
            "id_abastecimento": super.id_abastecimento,
            "id_turno": super.id_t,
            "odometro": super.odo,
            "custo": super.custo,
            "d_ini": super.dia,
            "q_ini": this.q_ini,
            "d_fim": this.d_fim,
            "q_fim": this.q_fim,
            "t_carga": this.tempo_de_carga,
            "carga": this.total_carga,
        }
        return obj;
    }

    async consumo_km (q_bateria, leitura_anterior) {
        const kwh_km = (q_bateria * this.total_carga / 100) / (super.odo - leitura_anterior);
        return kwh_km.toFixed(2) ;
    }
};

module.exports = Abastecimento_EV
