class Abastecimento {
    #_id_abastecimento;
    #_id_viatura;
    #_id_turno;
    #_id_condutor;
    #_data;
    #_odometro;
    #_custo;

    constructor(id, id_viatura, id_turno, id_condutor, data, kms, euros = 0){
        this.#_id_abastecimento = id;
        this.#_id_viatura = id_viatura;
        this.#_id_turno = id_turno;
        this.#_id_condutor = id_condutor;
        this.#_data = data;
        this.#_odometro = kms;
        this.#_custo = euros;
    }

    set id_abastecimento (id){this.#_id_abastecimento = id; }
    set id_viatura (idv) {this.#_id_viatura = idv; }
    set id_turno (idt) {this.#_id_turno = idt; }
    set id_condutor (idc) {this.#_id_condutor = idc; }
    set data (data) {this.#_data = data; }
    set odometro (kms) {this.#_odometro = kms; }
    set custo (euros) {this.#_custo = euros; }

    get abastecimento() { return this; }

    get id_abastecimento () {return this.#_id_abastecimento;}
    get id_viatura () {return this.#_id_viatura;}
    get id_turno () {return this.#_id_turno;}
    get id_condutor () {return this.#_id_condutor;}
    get data () {return this.#_data;}
    get odometro () {return this.#_odometro;}
    get custo () {return this.#_custo;}

    get as_object_0 (){
        const obj = {
            "id_abastecimento": this.id_abastecimento,
            // "id_viatura": this.id_viatura,
            // "id_turno": this.id_turno,
            // "id_condutor": this.id_condutor,
            "data": this.data,
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
            "data": this.data,
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
