const Abastecimento = require('./Abastecimento');

class Abastecimento_EV extends Abastecimento{
    #_q_ini;
    #_d_fim;
    #_h_fim;
    #_q_fim;

    constructor(id, id_viatura, id_turno, id_condutor, kms, dia, hora, carga_ini, d_fim=0, h_fim=0, carga_fim = 0, euros = 0){

        super(id, id_viatura, id_turno, id_condutor, dia, hora, kms, euros);

        this.#_q_ini = carga_ini;
        this.#_d_fim = d_fim;
        this.#_h_fim = h_fim;
        this.#_q_fim = carga_fim;
    }

    set d_ini_ (di) {super.dia(di);}
    set h_ini_ (hi) {super.hora(hi);}
    set q_ini_ (qi) {this.#_q_ini = qi;}
    set d_fim_ (df) {this.#_d_fim = df;}
    set h_fim_ (hf) {this.#_h_fim = hf;}
    set q_fim_ (qf) {this.#_q_fim = qf;}

    get d_ini () {return super.dia;}
    get h_ini () {return super.hora;}
    get q_ini () {return this.#_q_ini; }
    get d_fim () {return this.#_d_fim; }
    get h_fim () {return this.#_h_fim; }
    get q_fim () {return this.#_q_fim; }

    get tempo_de_carga () {
        if(this.h_ini && this.h_fim){
            const horas = Math.floor((Date.parse(this.d_fim + " "+ this.h_fim) - Date.parse(this.d_ini + " " + this.h_ini))/1000/60/60); 
            const minutos = ((Date.parse(this.d_fim + " " + this.h_fim) - Date.parse(this.d_ini +" "+ this.h_ini))/1000/60) % 60;
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
            "d_ini": super.dia,
            "h_ini": super.hora,
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
            "odometro": super.odometro,
            "custo": super.custo,
            "d_ini": super.dia,
            "h_ini": super.hora,
            "q_ini": this.q_ini,
            "d_fim": this.d_fim,
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
