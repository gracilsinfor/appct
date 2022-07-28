const Manutencoes = require('./Manutencoes');
const Abastecimentos = require('./Abastecimentos');

class Viatura {
    #_id;
    #_ev;
    #_n_r;
    #_desc;
    #_foto;
    #_ativa;
    #_odo;
    #_proxima_manutencao;
    #_ultima_manutencao;
    #_manutencoes;
    #_abastecimentos;

    constructor(id, ev, matricula, descricao, imagem, ativa = true, odometro = 0){
        this.#_id = id;
        this.#_ev = ev;
        this.#_n_r = matricula;
        this.#_desc = descricao;
        this.#_foto = imagem;
        this.#_ativa = ativa;
        this.#_odo = odometro;
        this.#_proxima_manutencao = {};
        this.#_ultima_manutencao = {};
        this.#_manutencoes = new Manutencoes;
        this.#_abastecimentos = new Abastecimentos;
    }

    set id (idv) { this.#_id = idv;}
    set ev (vl) { this.#_ev = vl;}
    set matricula (str) { this.#_n_r = str;}
    set descricao (str) { this.#_desc = str;}
    set imagem (str) { this.#_foto = str;}
    set ativa (vl) { this.#_ativa = vl;}
    set odo (kms) { this.#_odo = kms;}
    set ultima_manutencao(um){ this.#_ultima_manutencao = um;}
    set proxima_manutencao (pm) { this.#_proxima_manutencao = pm;}

    get viatura() { return this;}

    get id () { return this.#_id;}
    get ev () { return this.#_ev;}
    get matricula () { return this.#_n_r;}
    get descricao () { return this.#_desc;}
    get imagem () { return this.#_foto;}
    get ativa () { return this.#_ativa;}
    get odo () { return this.#_odo;}
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
            "id_viatura": this.id,
            "ev": this.ev,
            "descricao_viatura": this.desc,
            "matricula": this.#_n_r,
            "odometro": this.odo,
            "imagem_viatura": this.imagem,
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
        const manutencao = await this.manutencoes.manutencao_por_id(id_manutencao);
        return await manutencao;
    }

    async manutencoes_da_viatura() { 
        const arr_objs_manutencao = await this.manutencoes.todas_as_object();
        return arr_objs_manutencao;
    }

}

module.exports = Viatura