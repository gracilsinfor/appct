class Manutencao{
    #_id;
    #_d_i;
    #_kms;
    #_oficina;
    #_descricao;
    #_d_f;
    #_custo;

    constructor(id, data_i, kms, oficina="", descricao="", data_f=0, custo=0){
        this.#_id = id;
        this.#_d_i = data_i;
        this.#_kms = kms;
        this.#_oficina = oficina;
        this.#_descricao = descricao;
        this.#_d_f = data_f,
        this.#_custo = custo;
    }

    set id (id) { this.#_id = id; }
    set d_i (data) { this.#_d_i = data; }
    set kms (kms) { this.#_kms = kms; }
    set oficina (oficina) { this.#_oficina = oficina; }
    set descricao (descricao) { this.#_descricao = descricao; }
    set d_f (data) { this.#_d_f = data; }
    set custo (custo) { this.#_custo = custo; }

    get id () { return this.#_id; }
    get data () { return this.#_d_i; }
    get kms () { return this.#_kms; }
    get oficina () { return this.#_oficina; }
    get descricao () { return this.#_descricao; }
    get custo () { return this.#_custo; }

    get as_object (){
        const obj = {
            "id_manutencao": this.#_id,
            "data": this.#_d_i,
            "kms": this.#_kms,
            "oficina": this.#_oficina,
            "descricao": this.#_descricao,
            "custo": this.#_custo,
        }
        return obj;
    }

}

module.exports = Manutencao