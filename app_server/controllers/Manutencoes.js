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
            const item = await manutencao.as_object;
            ret_arr.push(item);
        }
        return ret_arr;
    } 

    manutencao_por_id = async function (id) {
        for await(const manutencao of this){
            if(manutencao.id_manutencao == id){
                return manutencao.as_object;
            }else{
                return -1;
            }
        }
    }

}

module.exports = Manutencoes