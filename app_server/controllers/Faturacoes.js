const Faturacao = require('./Faturacao');

class Faturacoes extends Array{

    nova = async function (arr){
        const faturacao = new Faturacao(...arr);
        this.push(faturacao);
        return faturacao;
    }

    get faturacoes() {
        return this;
    }

    get contador(){
        return this.length;
    } 

    faturacao_por_id = async function (id) {
        for await(const faturacao of this){
            if(faturacao.id_faturacao == id){
                return faturacao.as_object;
            }else{
                return -1;
            }
        }
    }   

    async faturacao_turno (id_turno) {
        const faturacao = await this.find(element => element.id_turno == id_turno);
        return await faturacao;
    }


    faturacao_periodo = async function (arr_idt) {
        const ret_arr = [];
        for await(const t of arr_idt){
            ret_arr.push(faturacao_por_turno(t));
        }
        return ret_arr;
    }
 
    faturacao_periodo_totais = async function (arr_f){  
        let t_f = [0, 0, 0];
        let t_g = [0, 0, 0];
        
        for await ( f of arr_f){
            
            const p_f = f.parcial_faturacao;
            t_f.map((e, i)=> e + p_f[i]);

            const p_g = f.parcial_gratificacao;
            t_g.map((e, i)=> e + p_g[i]);
        }
        const obj_return = {tf: t_f, tg: t_g,};

        return obj_return;
    }

    async faturacao_total () {
        let f = {"u":0, "b":0, "f":0};
        let g = {"u":0, "b":0, "f":0};

        for await (const faturacao of this){
            const {fu, fb, ff} = await faturacao.totais_parciais_faturacao;
            f.u += fu;
            f.b += fb;
            f.f += ff; 
            
            const {gu, gb, gf} = await faturacao.totais_parciais_gratificacao;
            g.u += gu;
            g.b += gb;
            g.f += gf; 

        }
        const tf = f.u + f.b + f.f;
        const tg = g.u + g.b + g.f;

        const obj = {
            f,
            g,
            tf,
            tg,
        }
        return obj;
    }

    async faturacao_do_turno(id_turno){
        let f = {"u":0, "b":0, "f":0};
        let g = {"u":0, "b":0, "f":0};

        for await (const faturacao of this){
            if(faturacao.id_turno == id_turno){
                const {fu, fb, ff} = await faturacao.totais_parciais_faturacao;
                f.u = fu;
                f.b = fb;
                f.f = ff; 
            
                const {gu, gb, gf} = await faturacao.totais_parciais_gratificacao;
                g.u = gu;
                g.b = gb;
                g.f = gf; 
                
                break;
            }
        }
        const tf = f.u + f.b + f.f;
        const tg = g.u + g.b + g.f;

        const obj = {
            id_turno: id_turno,
            f,
            g,
            tf,
            tg,
        }
        
        return obj;
    }

}

module.exports = Faturacoes