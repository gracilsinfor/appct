const Faturacoes = require('./Faturacoes');

class Condutor{
    #_id;
    #_nome;
    #_nif;
    #_telefone;
    #_email;
    #_entrada;
    #_kms;
    #_ativo;
    #_foto;

    constructor(id, nome, nif, telefone, email, data_entrada, ativo, kms, foto) {
        this.#_id = id;
        this.#_nome = nome;
        this.#_telefone = telefone;
        this.#_email = email;
        this.#_nif = nif;
        this.#_entrada = data_entrada;
        this.#_kms = kms;
        this.#_ativo = ativo;
        this.#_foto = foto;
    }

    set id(idc) {this.#_id = idc;}
    set nome(str) {this.#_nome = str;}
    set nif(nif) {this.#_nif = nif;}
    set telefone(telc) {this.#_telefone = telc;}
    set email(str) {this.#_email = str;}
    set data(data) {this.#_entrada = data;}
    set kms(kms) {this.#_kms = kms;}
    set ativo(vl) {this.#_ativo = vl;}
    set foto(str) {this.#_foto = str;}


    get id() {return this.#_id;}
    get nome() {return this.#_nome;}
    get nif() {return this.#_nif;}
    get telefone() {return this.#_telefone;}
    get email() {return this.#_email;}
    get data() {return this.#_entrada;}
    get kms() {return this.#_kms;}
    get ativo() {return this.#_ativo;}
    get foto() {return this.#_foto;}
    
    
    get as_object_0(){
        const obj = {
            "id_condutor": this.id,
            "nome_condutor": this.nome,
            "kms": this.kms,
            "foto_condutor": this.foto,
        }
        return obj;
    }

    get as_object() {
        const obj = {
            // ...this.as_object_0,
            "id_condutor": this.id,
            "nome_condutor": this.nome,
            "foto_condutor": this.foto,
            "kms": this.kms,
            "nif_condutor": this.nif,
            "telefone_condutor": this.telefone,
            "email_condutor": this.email,
            "data_entrada": this.data,
            "ativo": this.ativo,
        }
        return obj;
    }


}

module.exports = Condutor
