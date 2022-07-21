const Abastecimento = require('./Abastecimento');
const Abastecimento_MT = require('./Abastecimento_MT');
const Abastecimento_EV = require('./Abastecimento_EV');

class Abastecimentos extends Array{

    novo_mt (arr){
        const abastecimento = new Abastecimento_MT(...arr);
        this.push(abastecimento);
        // return abastecimento;
    }

    novo_ev(arr){
        const abastecimento = new Abastecimento_EV(...arr);
        this.push(abastecimento);
        // return abastecimento;
    }

    get ultimo_abastecimento () {
        return this[this.length-1];
    }
    
    get abastecimentos() {
        return this;
    }

    get contador(){
        return this.length;
    } 

    get todos(){
        return this;
    }

    async todos_as_object(){
        const arr_objs_abastecimento = [];
        for await(const abastecimento of this){
            arr_objs_abastecimento.push(await abastecimento.as_object);
        }
        return arr_objs_abastecimento;
    }

    async abastecimento_por_id (id_abastecimento) {
        for await(const abastecimento of this){
            if(abastecimento.id_abastecimento == id_abastecimento){
                return abastecimento;
            }
        }
    }

    async abastecimentos_por_turno(id_turno){
        const arr_abastecimentos = [];

        for await (const abastecimento of this){
            if ( abastecimento.id_turno == id_turno ){
                arr_abastecimentos.push(abastecimento);
            }
        }
        arr_abastecimentos.sort ( (a, b) => { a.odometro - b.odometro; } );

        return arr_abastecimentos;
    }
}

module.exports = Abastecimentos