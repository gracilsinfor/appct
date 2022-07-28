class Manutencao{
    #_id;
    #_id_viatura;
    #_data;
    #_kms;
    #_oficina;
    #_descricao;
    #_custo;

    constructor(id, id_viatura, data, kms, oficina, descricao, custo){
        this.#_id = id;
        this.#_id_viatura = id_viatura;
        this.#_data = data;
        this.#_kms = kms;
        this.#_oficina = oficina;
        this.#_descricao = descricao;
        this.#_custo = custo;
    }

    set id (id) { this.#_id = id; }
    set id_viatura (idc) { this.#_id_viatura = idc; }
    set data (data) { this.#_data = data; }
    set kms (kms) { this.#_kms = kms; }
    set oficina (oficina) { this.#_oficina = oficina; }
    set descricao (descricao) { this.#_descricao = descricao; }
    set custo (custo) { this.#_custo = custo; }

    get id () { return this.#_id; }
    get id_viatura () { return this.#_id_viatura; }
    get data () { return this.#_data; }
    get kms () { return this.#_kms; }
    get oficina () { return this.#_oficina; }
    get descricao () { return this.#_descricao; }
    get custo () { return this.#_custo; }

    get as_object (){
        const obj = {
            "id_manutencao": this.#_id,
            "id_viatura": this.#_id_viatura,
            "data": this.#_data,
            "kms": this.#_kms,
            "oficina": this.#_oficina,
            "descricao": this.#_descricao,
            "custo": this.#_custo,
        }
        return obj;
    }

}

module.exports = Manutencao