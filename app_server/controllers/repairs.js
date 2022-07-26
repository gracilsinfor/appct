const ctrl_viaturas = require('./teste_viaturas');
const request = require('request');

const repair_c = async (req, res)=>{
    const viatura = await ctrl_viaturas.viatura_por_id(turno.id_viatura);
    res.render(
        'manutencao', {
            title: 'Manutenção', 
            sub_title: 'nova', 
            viatura: await viatura.as_object_0,
            rota: "/Manutencao/C", 
        });
};

const repairs_r = async (req, res) => {
    const matriculas = await ctrl_viaturas.lista_matriculas();
    const tipos = [{"id": "ev", "tipo": "EV"}, {"id": "mt", "tipo": "MT"}];
    const viaturas_com_manutencoes = await ctrl_viaturas.lista_manutencoes();
    res.render('manutencoes', {
        title: 'Manutenções',
        sub_title: 'lista',
        matriculas: matriculas,
        tipos: tipos,
        viaturas: viaturas_com_manutencoes,
        rota: "/Manutencoes",
    });
};

async function repair_r (req, res) {
    console.log(req.params.idv);
    console.log(req.params.id);
    
    const viatura = await ctrl_viaturas.viatura_por_id(req.params.idv);
    const manutencao = await viatura.manutencao_por_id(req.params.id);
    // const manutencao = await ctrl_viaturas.manutencao_por_id(req.params.idv, req.params.id);
    const manutencoes = await viatura.manutencoes_da_viatura();

    console.log(await viatura.as_object);
    console.log(await manutencao.as_object);
    console.log(await manutencoes);

    res.render('manutencao', {
        title: 'Manutenção', 
        sub_title:'ficha', 
        viatura: await viatura.as_object,
        manutencao: await manutencao.as_object,
        manutencoes: await manutencoes,
        rota: "/Manutencao/idv/id", 
    });
}

async function repair_u (req, res){
    const viatura = await ctrl_viaturas.viatura_por_id(await req.params.idv);
    const id = req.params.id;
    res.render('manutencao', {
        title: 'Manutenção', 
        sub_title: 'atualização', 
        viatura: await viatura.as_object_0,
        rota: "/Manutencao/U/idv/id", 
    });
}

// para apagar um documento abastecimento
const repair_d = (req, res) => {
    res.render('index', { title: 'repair_info' });
};

module.exports = {
    repair_c,
    repairs_r,
    repair_r,
    repair_u,
    repair_d
}