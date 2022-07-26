const Manutencao = require('./Manutencao');

class Manutencoes extends Array {

    nova (arr){
        const manutencao = new Manutencao(...arr);
        this.push(manutencao);
        // return manutencao;
    }

    async ultima_manutencao () {
        const manutencao = this[this.length-1];
        if(manutencao === undefined){
            return {};
        }
        return manutencao.as_object;
}

    get contador(){
        return this.length;
    } 

    async todas_as_object (){
        const ret_arr = [];
        for await(const manutencao of this){
            const obj = await manutencao.as_object;
            ret_arr.push(obj);
        }
        // ret_arr.sort((a, b) => b.id_manutencao - a.id_manutencao);
        return ret_arr;
    } 

    async manutencao_por_id (id_manutencao) {
        for await(const manutencao of this){
            console.log("merda" + id_manutencao);
            if(manutencao.id_manutencao == id_manutencao){
                return await manutencao;
            }
        }
        return -1;
    }

}

module.exports = Manutencoes