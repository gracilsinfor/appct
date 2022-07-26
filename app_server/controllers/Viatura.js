const Manutencoes = require('./Manutencoes');
const Abastecimentos = require('./Abastecimentos');

class Viatura {
    #_id_viatura;
    #_ev;
    #_matricula;
    #_descricao_viatura;
    #_imagem_viatura;
    #_ativa;
    #_odometro;
    #_proxima_manutencao;
    #_ultima_manutencao;
    #_manutencoes;
    #_abastecimentos;

    constructor(id, ev, matricula, descricao, imagem, ativa = true, odometro = 0){
        this.#_id_viatura = id;
        this.#_ev = ev;
        this.#_matricula = matricula;
        this.#_descricao_viatura = descricao;
        this.#_imagem_viatura = imagem;
        this.#_ativa = ativa;
        this.#_odometro = odometro;
        this.#_proxima_manutencao = {};
        this.#_ultima_manutencao = {};
        this.#_manutencoes = new Manutencoes;
        this.#_abastecimentos = new Abastecimentos;
    }

    set id_viatura (idv) { this.#_id_viatura = idv;}
    set ev (vl) { this.#_ev = vl;}
    set matricula (str) { this.#_matricula = str;}
    set descricao_viatura (str) { this.#_descricao_viatura = str;}
    set imagem_viatura (str) { this.#_imagem_viatura = str;}
    set ativa (vl) { this.#_ativa = vl;}
    set odometro (kms) { this.#_odometro = kms;}
    set ultima_manutencao(um){ this.#_ultima_manutencao = um;}
    set proxima_manutencao (pm) { this.#_proxima_manutencao = pm;}

    get viatura() { return this;}

    get id_viatura () { return this.#_id_viatura;}
    get ev () { return this.#_ev;}
    get matricula () { return this.#_matricula;}
    get descricao_viatura () { return this.#_descricao_viatura;}
    get imagem_viatura () { return this.#_imagem_viatura;}
    get ativa () { return this.#_ativa;}
    get odometro () { return this.#_odometro;}
    get ultima_manutencao () { return this.#_ultima_manutencao;}
    get proxima_manutencao () { return this.#_proxima_manutencao;}

    get abastecimentos() { return this.#_abastecimentos;}
    get manutencoes() {return this.#_manutencoes;}

    get data_ultima_manutencao() { 
        if(this.ultima_manutencao != null){
            return {
                data: this.ultima_manutencao.data,
            };
        }else {
            return {
                data: "nd"
            };
        }
    }

    get kms_ultima_manutencao(){
        if(this.ultima_manutencao != null){
            return{
                kms: this.ultima_manutencao.kms,
            }; 
        }else {
            return{
                kms: "nd", 
            };
        }
    }

    get data_proxima_manutencao() { 
        if(this.proxima_manutencao != null){
            return{
                data: this.proxima_manutencao.data,
            };
        }else {
            return{data: "nd",};
        }
    }

    get kms_proxima_manutencao(){
        if(this.proxima_manutencao != null ){
            return{
                kms: this.proxima_manutencao.kms,
            };
        }else {
            return{
                kms: "nd",
            };
        }
    }

    get as_object_0(){
        const obj = {
            "id_viatura": this.id_viatura,
            "ev": this.ev,
            "descricao_viatura": this.descricao_viatura,
            "matricula": this.matricula,
            "odometro": this.odometro,
            "imagem_viatura": this.imagem_viatura,
            "ativa": this.ativa,  
        }
        return obj;
    }

    get as_object(){
        const obj = {
            ...this.as_object_0,
            "data_ultima_manutencao": this.data_ultima_manutencao,
            "kms_ultima_manutencao": this.kms_ultima_manutencao,
            "data_proxima_manutencao": this.data_proxima_manutencao,
            "kms_proxima_manutencao": this.kms_proxima_manutencao,
        }
        return obj;
    }
    
    async abastecimento_por_id(id_abastecimento){
        const abastecimento = await this.abastecimentos.abastecimento_por_id(id_abastecimento);
        return abastecimento;
    }

    async abastecimentos_da_viatura(){
        const arr_objs_abastecimento = await this.abastecimentos.todos_as_object()
        return arr_objs_abastecimento;
    }

    async custo_total_turno (id_turno) {
        let total = 0;
        for await (const abastecimento of this.abastecimentos){
            if(abastecimento.id_turno == id_turno){
                total += abastecimento.custo;
            } 
        }
        return total;
    }

    async manutencao_por_id(id_manutencao){
        console.log("merda" + id_manutencao);
        const manutencao = await this.manutencoes.manutencao_por_id(id_manutencao);
        // console.log(await manutencao.as_object);
        return await manutencao;
    }

    async manutencoes_da_viatura() { 
        const arr_objs_manutencao = await this.manutencoes.todas_as_object();
        return arr_objs_manutencao;
    }

}

module.exports = Viatura