const Abastecimento = require('./Abastecimento');

class Abastecimento_MT extends Abastecimento{
    #_litros;

    constructor(id, id_turno, dia, kms, litros, euros = 0){

        super(id, id_turno, dia, kms, euros);

        this.#_litros = litros;
    }

    set litros(lt){this.#_litros = lt; }

    get litros(){ return this.#_litros; }

    get as_object_0 (){
        const obj = {
            "id_abastecimento": super.id,
            "id_t": super.id_t,
            "dia": super.dia,
            "odometro": super.odo,
            "litros": this.litros,
            "custo": super.custo,
        }
        return obj;
    }

    get as_object (){
        const obj = {
            "id_abastecimento": super.id,
            "id_turno": super.id_t,
            "dia": super.dia,
            "odometro": super.odo,
            "litros": this.litros,
            "custo": super.custo,
        }
        return obj;
    }

    async consumo_km (leitura_anterior) {
        const litros_km = this.litros / (super.odo - leitura_anterior);
        return litros_km.toFixed(2);
    }
};

module.exports = Abastecimento_MT