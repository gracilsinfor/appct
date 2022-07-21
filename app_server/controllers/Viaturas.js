const Viatura = require('./Viatura');
const Viatura_EV = require('./Viatura_EV');
const Viatura_MT = require('./Viatura_MT');

class Viaturas extends Array{

    constructor(){
        if(Viaturas._instance){
            return Viaturas._instance;
        }
        super();
        Viaturas._instance = new Array;
    }

    nova_ev (arr) {
        const viatura = new Viatura_EV(...arr);
        this.push(viatura);
        return viatura;
    }

    nova_mt (arr) {
        const viatura = new Viatura_MT(...arr);
        this.push(viatura);
        return viatura;
    }

    async viatura_por_id (id_viatura) {
        for await(const viatura of this){
            if(await viatura.id_viatura == id_viatura){
                return viatura;
            }
        }
        return -1;
    }

    async lista_viaturas (){
        const arr_viaturas = [];
        for await(const viatura of this){
            const obj_viatura = await viatura.as_object_0;
            arr_viaturas.push(obj_viatura);
        }
        return arr_viaturas;
    }

    async abastecimentos_por_turno(id_viatura, id_turno){
        const viatura = await this.viatura_por_id(id_viatura);
        const abastecimentos = await viatura.abastecimentos_por_turno(id_turno);
        return await abastecimentos;
    }

    async lista_matriculas(){
        const matriculas = [];
        for await (const viatura of this){
            const obj = {"id": viatura.id_viatura, "viatura": viatura.descricao_viatura + ' - ' + viatura.matricula,};
            matriculas.push(obj);
        }
        return matriculas;
    }
}

module.exports = Viaturas