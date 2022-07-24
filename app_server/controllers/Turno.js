  class Turno{
    #_id_turno;
    #_id_condutor;
    #_id_viatura;
    #_d_ini;
    #_h_ini;
    #_odom_ini;
    #_d_fim;
    #_h_fim;
    #_odom_fim;

    constructor(id, id_condutor, id_viatura, odom_ini, d_ini, h_ini, odom_fim, d_fim=0, h_fim=0){
        this.#_id_turno = id;
        this.#_id_condutor = id_condutor;
        this.#_id_viatura = id_viatura;
        this.#_d_ini = d_ini;
        this.#_h_ini = h_ini;
        this.#_odom_ini = odom_ini;
        this.#_d_fim = d_fim,
        this.#_h_fim = h_fim;
        this.#_odom_fim = odom_fim;
    }

    set id_turno (idt) {this.#_id_turno = idt; }
    set id_condutor (idc) {this.#_id_condutor = idc; }
    set id_viatura (idv) { this.#_id_viatura = idv; }
    set d_ini (di) { this.#_d_ini = di; }
    set h_ini (hi) { this.#_h_ini = hi; }
    set odom_ini (kmi) { this.#_odom_ini = kmi; }
    set d_fim (df) { this.#_d_fim = df; }
    set h_fim (hf) { this.#_h_fim = hf; }
    set odom_fim (kmf) { this.#_odom_fim = kmf; }

    get id_turno () {return this.#_id_turno; }
    get id_condutor () {return this.#_id_condutor; }
    get id_viatura () {return this.#_id_viatura; }
    get d_ini () {return this.#_d_ini; }
    get h_ini () {return this.#_h_ini; }
    get odom_ini () {return this.#_odom_ini; }
    get d_fim () {return this.#_d_fim; }
    get h_fim () {return this.#_h_fim; }
    get odom_fim () {return this.#_odom_fim; }

    get turno () { return this; }

    get as_object_0() { 
        const ret_obj = {
            "id_turno": this.id_turno,
            "id_condutor": this.id_condutor,
            "id_viatura": this.id_viatura,
            "d_ini": this.d_ini,
            "h_ini": this.h_ini,
            "odom_ini": this.odom_ini,
            "d_fim": this.d_fim,
            "h_fim": this.h_fim,
            "odom_fim": this.odom_fim,
        }
        return ret_obj; 
    }

    get as_object() { 
        const ret_obj = {
            "id_turno": this.id_turno,
            "id_condutor": this.id_condutor,
            "id_viatura": this.id_viatura,
            "d_ini": this.d_ini,
            "h_ini": this.h_ini,
            "odom_ini": this.odom_ini,
            "d_fim": this.d_fim,
            "h_fim": this.h_fim,
            "odom_fim": this.odom_fim,
            "kms_percorridos": this.kms_percorridos,
            "horas_conducao": this.horas_conducao,
        }
        console.log(ret_obj);
        return ret_obj; 
    }

    get kms_percorridos () {
        const total = this.odom_fim - this.odom_ini;
        if(total > 0){
            return total;
        }else{
            return -1;
        }
    }

    get horas_conducao () {
        const data_ini = Date.parse(this.d_ini + " " + this.h_ini);
        const data_fim = Date.parse(this.d_fim + " " + this.h_fim);
        if(this.h_ini && this.h_fim){
            const horas = Math.floor((data_fim - data_ini)/1000/60/60); 
            const minutos = ((data_fim - data_ini)/1000/60) % 60;
            // console.log(this.#_h_fim);
            return (minutos < 10 ? horas + ":0" + minutos : horas + ":" + minutos);
        }else{ 
            return "00:00"; 
        }
    }
}

module.exports = Turno

