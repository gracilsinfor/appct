class Abastecimento {
    #_id_abastecimento;
    #_id_viatura;
    #_id_turno;
    #_id_condutor;
    #_dia;
    #_hora;
    #_odometro;
    #_custo;

    constructor(id, id_viatura, id_turno, id_condutor, dia, hora, kms, euros = 0){
        this.#_id_abastecimento = id;
        this.#_id_viatura = id_viatura;
        this.#_id_turno = id_turno;
        this.#_id_condutor = id_condutor;
        this.#_dia = dia;
        this.#_hora = hora;
        this.#_odometro = kms;
        this.#_custo = euros;
    }

    set id_abastecimento (id){this.#_id_abastecimento = id; }
    set id_viatura (idv) {this.#_id_viatura = idv; }
    set id_turno (idt) {this.#_id_turno = idt; }
    set id_condutor (idc) {this.#_id_condutor = idc; }
    set dia (dia) {this.#_dia = dia; }
    set hora (hora) {this.#_hora = hora; }
    set odometro (kms) {this.#_odometro = kms; }
    set custo (euros) {this.#_custo = euros; }

    get abastecimento() { return this; }

    get id_abastecimento () {return this.#_id_abastecimento;}
    get id_viatura () {return this.#_id_viatura;}
    get id_turno () {return this.#_id_turno;}
    get id_condutor () {return this.#_id_condutor;}
    get dia () {return this.#_dia;}
    get hora () {return this.#_hora;}
    get odometro () {return this.#_odometro;}
    get custo () {return this.#_custo;}

    get as_object_0 (){
        const obj = {
            "id_abastecimento": this.id_abastecimento,
            // "id_viatura": this.id_viatura,
            // "id_turno": this.id_turno,
            // "id_condutor": this.id_condutor,
            "dia": this.dia,
            "hora": this.hora,
            "odometro": this.odometro,
            "custo": this.custo,
        }
        return obj;
    }

    get as_object (){
        const obj = {
            "id_abastecimento": this.id_abastecimento,
            "id_viatura": this.id_viatura,
            "id_turno": this.id_turno,
            "id_condutor": this.id_condutor,
            "dia": this.dia,
            "hora": this.hora,
            "odometro": this.odometro,
            "custo": this.custo,
        }
        return obj;
    }

    async conta_kms(leitura_anterior){
        return await this.odometro - leitura_anterior;
    }

    custo_km (leitura_anterior){
        const custo = this.custo / ( this.odometro - leitura_anterior );
        return custo.toFixed(2)
    }

};

module.exports = Abastecimento
