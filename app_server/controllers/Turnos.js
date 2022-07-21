const Turno = require('./Turno');

class Turnos extends Array{

    constructor(){
        if(Turnos._instance){
            return Turnos._instance;
        }
        super();
        Turnos._instance = new Array;
    }

    novo (arr){
        const turno = new Turno(...arr);
        this.push(turno);
        return turno;
    }

    turno_por_id (id_turno) {
        for (const turno of this){
            if(turno.id_turno == id_turno){
                return turno;
            }
        }
        return -1;
    }

    async turnos_por_condutor(id_condutor){
        const arr_turnos = [];
        for await(const turno of this){
            if(turno.id_condutor == id_condutor){
                arr_turnos.push(await turno.as_object);
            }
        }
        return arr_turnos;
    }
}

module.exports = Turnos