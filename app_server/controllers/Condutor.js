const Faturacoes = require('./Faturacoes');

class Condutor{
    #_id_condutor;
    #_nome_condutor;
    #_nif_condutor;
    #_telefone_condutor;
    #_email_condutor;
    #_data_entrada;
    #_ativo;
    #_kms_feitos;
    #_imagem_condutor;
    #_faturacoes;

    constructor(id, nome, nif, telefone, email, data_entrada, ativo, kms_feitos, imagem) {
        this.#_id_condutor = id;
        this.#_nome_condutor = nome;
        this.#_telefone_condutor = telefone;
        this.#_email_condutor = email;
        this.#_nif_condutor = nif;
        this.#_data_entrada = data_entrada;
        this.#_ativo = ativo;
        this.#_kms_feitos = kms_feitos;
        this.#_imagem_condutor = imagem;
        this.#_faturacoes = new Faturacoes;
    }

    set id_condutor(idc) {this.#_id_condutor = idc;}
    set nome_condutor(str) {this.#_nome_condutor = str;}
    set nif_condutor(nifc) {this.#_nif_condutor = nifc;}
    set telefone_condutor(telc) {this.#_telefone_condutor = telc;}
    set email_condutor(str) {this.#_email_condutor = str;}
    set data_entrada(data) {this.#_data_entrada = data;}
    set ativo(vl) {this.#_ativo = vl;}
    set kms_feitos(kms) {this.#_kms_feitos = kms;}
    set imagem_condutor(str) {this.#_imagem_condutor = str;}


    get id_condutor() {return this.#_id_condutor;}
    get nome_condutor() {return this.#_nome_condutor;}
    get nif_condutor() {return this.#_nif_condutor;}
    get telefone_condutor() {return this.#_telefone_condutor;}
    get email_condutor() {return this.#_email_condutor;}
    get data_entrada() {return this.#_data_entrada;}
    get ativo() {return this.#_ativo;}
    get kms_feitos() {return this.#_kms_feitos;}
    get imagem_condutor() {return this.#_imagem_condutor;}
    
    get faturacoes () { return this.#_faturacoes; }
    
    get as_object_0(){
        const obj = {
            "id_condutor": this.id_condutor,
            "nome_condutor": this.nome_condutor,
            "kms_feitos": this.kms_feitos,
            "imagem_condutor": this.imagem_condutor,
        }
        return obj;
    }

    get as_object() {
        const obj = {
            // ...this.as_object_0,
            "id_condutor": this.id_condutor,
            "nome_condutor": this.nome_condutor,
            "imagem_condutor": this.imagem_condutor,
            "kms_feitos": this.kms_feitos,
            "nif_condutor": this.nif_condutor,
            "telefone_condutor": this.telefone_condutor,
            "email_condutor": this.email_condutor,
            "data_entrada": this.data_entrada,
            "ativo": this.ativo,
        }
        return obj;
    }

    async faturacao_total(){
        const faturacao = this.faturacoes.faturacao_total();
        return faturacao;
    }

    async faturacao_do_turno(id_turno){
        const faturacao = await this.faturacoes.faturacao_do_turno(id_turno);
        return faturacao;
    }
}

module.exports = Condutor
