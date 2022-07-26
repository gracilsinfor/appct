const Condutor = require('./Condutor');

class Condutores extends Array {

    constructor(){
        if(Condutores._instance){
            return Condutores._instance;
        }
        super();
        Condutores._instance = new Array;
    }

    novo = function (arr) {
        const condutor = new Condutor(...arr);
        this.push(condutor);
        return condutor;
    }

    async todos_as_object () {
        const ret_arr = [];
        for await (const condutor of this ){
            ret_arr.push(await condutor.as_object);
        }
        return ret_arr;
    }

    get contador(){
        return this.length;
    }

    async condutor_por_id (id_condutor) {
        const condutor = await this.find(element => element.id_condutor == id_condutor);
        return await condutor;
    }

    async lista_nomes(){
        const nomes = [];
        for await (const condutor of this){
            const obj = {"id": condutor.id_condutor, "nome": condutor.nome_condutor,};
            nomes.push(obj);
        }
        return nomes;
    }

    async faturacao_total(id_condutor){
        const condutor = await this.find(element => element.id_condutor == id_condutor);
        const faturacao = await condutor.faturacao_total();
        return faturacao;

    }

    async faturacao_do_turno(id_turno){
        const condutor = await this.find(element => element.id_condutor == id_condutor);
        const faturacao = await condutor.faturacao_do_turno(id_turno);
        return await faturacao;
    }

}

module.exports = Condutores