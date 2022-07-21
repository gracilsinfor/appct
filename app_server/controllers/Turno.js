  class Turno{
    #_id_turno;
    #_id_condutor;
    #_id_viatura;
    #_h_ini;
    #_odom_ini;
    #_h_fim;
    #_odom_fim;

    constructor(id, id_condutor, id_viatura, odom_ini, h_ini, odom_fim = 0, h_fim = 0){
        this.#_id_turno = id;
        this.#_id_condutor = id_condutor;
        this.#_id_viatura = id_viatura;
        this.#_h_ini = h_ini;
        this.#_odom_ini = odom_ini;
        this.#_h_fim = h_fim;
        this.#_odom_fim = odom_fim;
    }

    set id_turno (idt) {this.#_id_turno = idt; }
    set id_condutor (idc) {this.#_id_condutor = idc; }
    set id_viatura (idv) { this.#_id_viatura = idv; }
    set h_ini (hi) { this.#_h_ini = hi; }
    set odom_ini (kmi) { this.#_odom_ini = kmi; }
    set h_fim (hf) { this.#_h_fim = hf; }
    set odom_fim (kmf) { this.#_odom_fim = kmf; }

    get id_turno () {return this.#_id_turno; }
    get id_condutor () {return this.#_id_condutor; }
    get id_viatura () {return this.#_id_viatura; }
    get h_ini () {return this.#_h_ini; }
    get odom_ini () {return this.#_odom_ini; }
    get h_fim () {return this.#_h_fim; }
    get odom_fim () {return this.#_odom_fim; }

    get turno () { return this; }

    get as_object_0() { 
        const ret_obj = {
            "id_turno": this.id_turno,
            "id_condutor": this.id_condutor,
            "id_viatura": this.id_viatura,
            "h_ini": this.h_ini,
            "h_fim": this.h_fim,
            "odom_ini": this.odom_ini,
        }
        return ret_obj; 
    }

    get as_object() { 
        const ret_obj = {
            "id_turno": this.id_turno,
            "id_condutor": this.id_condutor,
            "id_viatura": this.id_viatura,
            "h_ini": this.h_ini,
            "odom_ini": this.odom_ini,
            "h_fim": this.h_fim,
            "odom_fim": this.odom_fim,
            "kms_percorridos": this.kms_percorridos,
            "horas_conducao": this.horas_conducao,
        }
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
        if(this.#_h_ini && this.#_h_fim){
            const horas = Math.floor((Date.parse(this.#_h_fim) - Date.parse(this.#_h_ini))/1000/60/60); 
            const minutos = ((Date.parse(this.#_h_fim) - Date.parse(this.#_h_ini))/1000/60) % 60;
            // console.log(this.#_h_fim);
            return (minutos < 10 ? horas + ":0" + minutos : horas + ":" + minutos);
        }else{ return "00:00"; }

    }
}

module.exports = Turno

