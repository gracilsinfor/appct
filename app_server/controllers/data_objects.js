class Turno{
    constructor(id, id_condutor, id_viatura, km_ini, h_ini, km_fim, h_fim){
        this._id = id;
        this._id_condutor = id_condutor;
        this._id_viatura = id_viatura;
        this._km_ini = km_ini;
        this._h_ini = h_ini;
        this._km_fim = km_fim;
        this._h_fim = h_fim;
    }

    _id = "";
    _id_condutor = "";
    _id_viatura = "";
    _km_ini = "";
    _h_ini = "";
    _km_fim = "";
    _km_fim = "";

    /** setters */

    id_(id) { this._id = id; };
    id_condutor_(idc) { this._id_condutor = idc; };
    id_viatura_function(idv) { this._id_viatura = idv; };
    km_ini_(kmi) { this._km_ini = kmi; };
    h_ini_(hi) { this._h_ini = hi; };
    km_fim_(kmf) { this._km_fim = kmf; };
    h_fim_(hf) { this._h_fim = hf; };

    /** getters */

    turno() { return JSON.parse(JSON.stringify(this)); };

    id() { return this._id; };
    id_turno() { return this._id_turno; };
    id_viatura() { return this._id_viatura; };
    km_ini() { return this._km_ini; };
    h_ini() { return this._h_ini; };
    km_fim() { return this._km_fim; };
    h_fim() { return this._h_fim; };
};


const Faturacao = {
    _id: "",
    _id_turno: "",
    _id_condutor: "",
    _f_u: 0,
    _f_b: 0,
    _f_f: 0,
    _g_u: 0,
    _g_b: 0,
    _g_f: 0,

    /** construtor */

    Faturacao(id, id_turno, id_condutor, f_u, f_b, f_f, g_u, g_b, g_f){
        this._id = id;
        this._id_turno = id_turno;
        this._id_condutor = id_condutor,
        this._f_u = f_u;
        this._f_b = f_b;
        this._f_f = f_f;
        this._g_u = g_u;
        this._g_b = g_b;
        this._g_f = g_f;        
    },

    /** setters */

    id_: function(id) { this._id = id; },
    id_turno_: function(idt) { this._id_turno = idt; },
    id_condutor_: function(idc) { this._id_condutor = idc; },

    fu_: function(fu) { this._f_u = fu; },
    fb_: function(fb) { this._f_b = fb; },
    ff_: function(ff) { this._f_f = ff; },

    gu_: function(gu) { this._g_u = gu; },
    gb_: function(gb) { this._g_b = gb; },
    gf_: function(gf) { this._g_f = gf; },

    /** getters */

    faturacao: function() { return JSON.parse(JSON.stringify(this)); },

    id: function() { return this._id; },
    idturno: function() { return this._id_turno; },
    idcondutor: function() { return this._id_condutor; },
    fu: function() { return this._f_u; },
    fb: function() { return this._f_b; },
    ff: function() { return this._f_f; },
    gu: function() { return this._g_u; },
    gb: function() { return this._g_b; },
    gf: function() { return this._g_f; },

    /** computters */
    total_faturacao: function() { return this._f_u + this._f_b + this._f_f; },
    
    total_gratificacao: function() { return this._g_u + this._g_b + this._g_f; }
};

const Condutor = {
    _id: "",
    _nome: "",
    _telefone: "",
    _email: "",
    _data_entrada: "",
    _ativo: "",
    _kms_feitos: 0,
    _imagem: "",
    _faturacoes: [{}],   /** Faturacao */

    /** construtor */

    Condutor(id, nome, telefone, email, data_entrada, estado, kms, imagem) {
        this._id = id;
        this._nome = nome;
        this._telefone = telefone;
        this._email = email;
        this._data_entrada = data_entrada;
        this._ativo = estado;
        this._kms_feitos = kms;
        this._imagem = imagem;
    },

    /** setters  */
    id_: function(id) { this._id = id; },
    nome_: function(nome) { this._nome = nome; },
    telefone_: function(telefone) { this._telefone = telefone; },
    email_: function(email) { this._email = email; },
    data_entrada_: function(data) { this._data_entrada = data; },
    ativo_: function(logica) { this._ativo = logica; },
    kms_feitos_: function(kms) { this._kms_feitos = kms; },
    imagem_: function(imagem) { this._imagem = imagem; },

    /** para acrescentar novo documento faturação aos registos do condutor  */
    faturacao_: function(id_turno, f_u, f_b, f_f, g_u, g_b, g_f) {
        let id = '';
        if(this._faturacoes)
        { id = this._faturacoes.length + 1; }
        else { id = 1 ; }
        const registo = new Faturacao(id, id_turno, f_u, f_b, f_f, g_u, g_b, g_f);
        this._faturacoes.push(registo);
    },

    /** getters */
    condutor: function() { return JSON.parse(JSON.stringify(this)); },

    referencia_condutor: function() {
        return {
            id: this._id,
            nome: this.nome,
            ativo: this.ativo,
            kms: this.kms,
            imagem: this._imagem,
        };
    },

    id: function() { return this._id; },
    nome: function() { return this._nome; },
    telefone: function() { return this._telefone; },
    email: function() { return this._email; },
    data_entrada: function() { return this._data_entrada; },
    ativo: function() { return this._ativo; },
    kms_feitos: function() { return this._kms_feitos; },
    imagem: function() { return this._imagem; },

    faturacoes: function() { return JSON.parse(JSON.stringify(this._faturacoes)); },
    
    faturacao_id_turno: function async (idt) {
        for (const faturacao of this._faturacoes){
            if(faturacao.id_turno == idt){
                return JSON.parse(JSON.stringify(faturacao));
            }
        }
    }
};

const Abastecimento = {
    _id: "",
    _id_viatura: "",
    _id_turno: "",
    _id_condutor: "",
    _data: "",
    _kms: 0,
    _litros: 0,
    _euros: 0,

    /** constructor */

    Abastecimento(id, id_viatura, id_turno, id_condutor, data, kms, litros, euros){
        this._id = id,
        this._id_viatura = id_viatura,
        this._id_turno = id_turno,
        this._id_condutor = id_condutor,
        this._data = data,
        this._kms = kms,
        this._litros = litros,
        this._euros = euros
    },

    /** setters */

    id_: function(id) { this._id = id; },
    id_viatura_: function(idv) { this._id_viatura = idv; },
    id_turno_: function(idt) { this._id_turno = idt; },
    id_condutor_: function(idc) { this._id_condutor = idc; },
    data_: function(data) { this._data = data; },
    kms_: function(km) { this._kms = km; },
    litros_: function(litros) { this._litros = litros; },
    euros_: function(euros) { this._euros = euros; },

    /** getters */

    abastecimento: function() { return JSON.parse(JSON.stringify(this)); },

    id: function() { return this._id; },
    id_viatura: function() { this._id_viatura; },
    id_turno: function() { this._id_turno; },
    id_condutor: function() { this._id_condutor; },
    data: function() { this._data; },
    kms: function() { this._kms; },
    litros: function() { this._litros; },
    euros: function() { this._euros; }

};

const Abastecimento_EV = {
    _id: "",
    _id_viatura: "",
    _id_turno: "",
    _id_condutor: "",
    _kms: 0,
    _h_ini: "",
    _carga_ini: 0,
    _h_fim: "",
    _carga_fim: 0,
    _euros: 0,

    /** constructor */

    Abastecimento(id, id_viatura, id_turno, id_condutor, kms, h_ini, carga_ini){
        this._id = id,
        this._id_viatura = id_viatura,
        this._id_turno = id_turno,
        this._id_condutor = id_condutor,
        this._kms = kms,
        this._h_ini = data,
        this._carga_ini = carga_ini
    },

    /** setters */

    id_: function(id) { this._id = id; },
    id_viatura_: function(idv) { this._id_turno = idv; },
    id_turno_: function(idt) { this._id_turno = idt; },
    id_condutor_: function(idc) { this._id_condutor = idc; },
    kms_: function(km) { this._kms = km },
    h_ini_: function(data) { this._h_ini = data; },
    carga_ini_: function(carga) { this._carga_ini = carga; },
    h_fim_: function(data) { this._h_fim = data; },
    carga_fim_: function(carga) { this._carga_fim = carga; },
    euros_: function(euros) { this._euros = euros; },

    /** getters */

    abastecimento: function() { return JSON.parse(JSON.stringify(this)); },

    id: function() { return this._id; },
    id_viatura: function() { return this._id_viatura; },
    id_turno: function() { return this._id_turno; },
    id_condutor: function() { return this._id_condutor; },
    kms: function() { return this._kms; },
    h_ini: function() { return this._h_ini; },
    carga_ini: function() { return this._carga_ini; },
    h_fim: function() { return this._h_fim = data; },
    carga_fim: function() { return this._carga_fim; },
    euros: function() { return this._euros; },
    
    /** computters */

    tempo_de_carga: function() { return this._h_fim - this._h_ini; },
    total_carga: function() { return this._carga_fim - this._carga_ini; }

};

const Manutencao = {
    _id: "",
    _id_viatura: "",
    _data: "",
    _kms: 0,
    _oficina: "",
    _descricao: "",
    _euros: 0,

    /** construtor */

    Manutencao(id, id_viatura, data, kms, oficina, descricao, euros){
        this._id = id;
        this._id_viatura = id_carro;
        this._data = data;
        this._kms = kms;
        this._oficina = oficina;
        this._descricao = descricao;
        this._euros = euros;
    },

    /** setters */
    id_: function(id) { this._id = id; },
    id_carro_: function(idc) { this._id_viatura = idc; },
    data_: function(data) { this._data = data; },
    kms_: function(kms) { this._kms = kms; },
    oficina_: function(oficina) { this._oficina = oficina; },
    descricao_: function(descricao) { this._descricao = descricao; },
    euros_: function(euros) { this._euros = euros; },

    /** getters */

    revisao: function() { return JSON.parse(JSON.stringify(this)); },

    id: function() { return this._id; },
    id_carro: function() { return this._id_viatura; },
    data: function() { return this._data; },
    kms: function() { return this._kms; },
    oficina: function() { return this._oficina; },
    descricao: function() { return this._descricao; },
    euros: function() { return this._euros; }
};

const Viatura = {
    _id: "",
    _tipo: "",
    _matricula: "",
    _descricao: "",
    _imagem: "",
    _kms_atuais: "",
    _proxima_manutencao: {},
    _manutencoes: [{}],
    _abastecimentos: [{}], 

    /** constructor */

    Viatura(id, tipo, matricula, descricao, imagem, kms){
        this._id = id,
        this._tipo = tipo,
        this._matricula = matricula,
        this._descricao = descricao,
        this._imagem = imagem,
        this._kms_atuais = kms
    },

    /** setters */

    id_: function(id) { this._id = id; },
    tipo_: function(tipo) { this._tipo = tipo; },
    matricula_: function(matricula) { this._matricula = matricula; },
    descricao_: function(descricao) { this._descricao = descricao; },
    imagem_: function(imagem) { this._imagem = imagem; },
    kms_atuais_: function(kms) { this._kms_atuais = kms; },

    proxima_manutencao_: function( id, id_carro, kms ) {
        let novo_id = '';
        if(this._manutencoes)
        { novo_id = this._manutencoes.length + 1; }
        else{ id = 1; }

        if(this._proxima_manutencao){
            this.revisoes_(
                this._proxima_manutencao._id,
                this._proxima_manutencao._id_viatura,
                this._proxima_manutencao._data,
                this._proxima_manutencao._kms,
                this._proxima_manutencao._oficina,
                this._proxima_manutencao._descricao,
                this._proxima_manutencao._euros
            );

            const registo = new Revisao( id, id_carro, kms );
            this._proxima_manutencao = registo;
        }
    },

    manutencoes_: function(id, id_carro, data, kms, oficina, descricao, euros ) {
        const manutencao = new Revisao( id, id_carro, data, kms, oficina, descricao, euros );
        this._manutencoes.push(manutencao);
    },
    
    abastecimento_: function() {
        let id = '';
        if(this._abastecimentos)
        { id = this._abastecimentos.length + 1; }
        else{ id = 1; }
        
        if(this._tipo === 'EV'){
            const registo = new Abastecimento_EV( id, id_turno, id_condutor, kms, h_ini, carga_ini );
            this._abastecimentos.push(registo);
        }else{
            const registo = new Abastecimento( id, id_turno, id_condutor, data, kms, litros, euros );
            this._abastecimentos.push(registo);            
        } 
    },

    /** getters */

    id: function() { return this._id; },
    id_carro: function() { return this._id_viatura; },
    matricula: function() { return this._matricula; },
    descricao: function() { return this._descricao; },
    imagem: function() { return this._imagem; },
    kms_atuais: function() { return this._kms_atuais; },

    kms: function() { return this._abastecimentos[this._abastecimentos.lenght - 1].kms; },

    proxima_manutencao: function() { return JSON.parse(JSON.stringify(this._proxima_manutencao)); },
    manutencoes: function() { return JSON.parse(JSON.stringify(this._manutencoes)); },
    abastecimentos: function() { return JSON.parse(JSON.stringify(this._abastecimentos)); },

    viatura: function() { return JSON.parse(JSON.stringify(this)); },

    /** computters */






};

module.exports = {
    Turno,
    Faturacao,
    Condutor,
    Abastecimento,
    Abastecimento_EV,
    Manutencao,
    Viatura
};
