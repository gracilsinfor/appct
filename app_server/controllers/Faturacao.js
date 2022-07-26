class Faturacao {
    #_id_faturacao;
    #_id_turno;
    #_id_condutor;
    #_f_u;
    #_f_b;
    #_f_f;
    #_g_u;
    #_g_b;
    #_g_f;   

    constructor(id_faturacao, id_turno, id_condutor, f_u, f_b, f_f, g_u, g_b, g_f){
        this.#_id_faturacao = id_faturacao;
        this.#_id_turno = id_turno;
        this.#_id_condutor = id_condutor,
        this.#_f_u = f_u;
        this.#_f_b = f_b;
        this.#_f_f = f_f;
        this.#_g_u = g_u;
        this.#_g_b = g_b;
        this.#_g_f = g_f;        
    }

    set id_faturacao (idf) {this.#_id_faturacao = idf;}
    set id_turno (idt) {this.#_id_turno = idt;}
    set id_condutor (idc) {this.#_id_condutor = idc;}
    set f_u (fu) {this.#_f_u = fu;}
    set f_b (fb) {this.#_f_b = fb;}
    set f_f (ff) {this.#_f_f = ff;}
    set g_u (gu) {this.#_g_u = gu;}
    set g_b (gb) {this.#_g_b = gb;}
    set g_f (gf) {this.#_g_f = gf;}        

    get as_string () { return JSON.stringify(this); }

    get id_faturacao () {return this.#_id_faturacao;}
    get id_turno () {return this.#_id_turno;}
    get id_condutor () {return this.#_id_condutor;}
    get f_u () {return this.#_f_u;}
    get f_b () {return this.#_f_b;}
    get f_f () {return this.#_f_f;}
    get g_u () {return this.#_g_u;}
    get g_b () {return this.#_g_b;}
    get g_f () {return this.#_g_f;}  

    get as_object (){
        const obj = {
            "id_faturacao": this.#_id_faturacao,
            "id_turno": this.#_id_turno,
            "id_condutor": this.#_id_condutor,
            "f_u": this.#_f_u,
            "f_b": this.#_f_b,
            "f_f": this.#_f_f,
            "g_u": this.#_g_u,
            "g_b": this.#_g_b,
            "g_f": this.#_g_f,
            "faturado": this.total_faturacao,
            "gratificado": this.total_gratificacao,               
        }
        return obj;
    }

    get totais_parciais_faturacao(){
        const obj = {
            "fu": this.f_u,
            "fb": this.f_b,
            "ff": this.f_f,
        };
        return obj;
    }
    
    get totais_parciais_gratificacao(){
        const obj = {
            "gu": this.g_u,
            "gb": this.g_b,
            "gf": this.g_f,
        };
        return obj;
    }

    get total_faturacao () { return this.#_f_u + this.#_f_b + this.#_f_f; }
    
    get total_gratificacao () { return this.#_g_u + this.#_g_b + this.#_g_f; }

    get parcial_faturacao () { return [this.#_f_u, this.#_f_b, this.#_f_f]; }

    get parcial_gratificacao () { return [this.#_g_u, this.#_g_b, this.#_g_f]; }
};

module.exports = Faturacao