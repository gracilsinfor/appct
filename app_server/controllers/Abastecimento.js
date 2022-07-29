class Abastecimento {
    #_id;
    #_id_t;
    #_d;
    #_odo;
    #_custo;

    constructor(id, id_turno, dia, kms, euros = 0){
        this.#_id = id;
        this.#_id_t = id_turno;
        this.#_d = dia;
        this.#_odo = kms;
        this.#_custo = euros;
    }

    set id (id){this.#_id = id; }
    set id_t (idt) {this.#_id_t = idt; }
    set dia (dia) {this.#_d = dia; }
    set odo (kms) {this.#_odo = kms; }
    set custo (euros) {this.#_custo = euros; }

    get abastecimento() { return this; }

    get id () {return this.#_id;}
    get id_t () {return this.#_id_t;}
    get dia () {return this.#_d;}
    get odo () {return this.#_odo;}
    get custo () {return this.#_custo;}

    get as_object_0 (){
        const obj = {
            "id_abastecimento": this.id,
            "id_turno": this.id_t,
            "dia": this.dia,
            "odometro": this.odometro,
            "custo": this.custo,
        }
        return obj;
    }

    get as_object (){
        const obj = {
            "id_abastecimento": this.id,
            "id_turno": this.id_t,
            "dia": this.dia,
            "odometro": this.odometro,
            "custo": this.custo,
        }
        return obj;
    }

    async conta_kms(leitura_anterior){
        return await this.odo - leitura_anterior;
    }

    custo_km (leitura_anterior){
        const custo = this.custo / ( this.odo - leitura_anterior );
        return custo.toFixed(2)
    }

};

module.exports = Abastecimento
