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
    #_manut;
    #_manuts;
    #_abasts;

    constructor(id, ev, n_r, desc, foto, ativa = true, odometro = 0){
        this.#_id = id;
        this.#_ev = ev;
        this.#_n_r = n_r;
        this.#_desc = desc;
        this.#_foto = foto;
        this.#_ativa = ativa;
        this.#_odo = odometro;
    }

    set id (idv) { this.#_id = idv;}
    set ev (vl) { this.#_ev = vl;}
    set n_r (str) { this.#_n_r = str;}
    set desc (str) { this.#_desc = str;}
    set foto (str) { this.#_foto = str;}
    set ativa (vl) { this.#_ativa = vl;}
    set odo (kms) { this.#_odo = kms;}
    set manut (man) { this.#_manut = man;}

    get viatura() { return this;}

    get id () { return this.#_id;}
    get ev () { return this.#_ev;}
    get n_r () { return this.#_n_r;}
    get desc () { return this.#_desc;}
    get foto () { return this.#_foto;}
    get ativa () { return this.#_ativa;}
    get odo () { return this.#_odo;}
    get manut () { return this.#_manut;}

    get abastecimentos() { return this.#_abasts;}
    get manuts() {return this.#_manuts;}

    get data_ultima_manutencao() { 
        if(this.manuts.length){
            return this.manuts[this.manuts.length-1].data;
        }else {
            return "nd";
        }
    }

    get kms_ultima_manutencao(){
        if(this.manuts.length){
            return this.manuts[this.manuts.length-1].kms; 
        }else { 
            return "nd";
        }
    }

    get data_manutencao() { 
        if(this.manut.data){
            return this.manut.data;
        }else {
            return "nd";
        }
    }

    get kms_proxima_manutencao(){
        if(this.manut.kms ){
            return this.manut.kms;
        }else {
            return "nd";
        }
    }

    get as_object_0(){
        const obj = {
            "id_viatura": this.id,
            "ev": this.ev,
            "descricao_viatura": this.desc,
            "n_r": this.#_n_r,
            "odometro": this.odo,
            "imagem_viatura": this.foto,
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