const ctrl_condutores = require('./teste_condutores');
const ctrl_turnos = require('./teste_turnos');

const request = require('request');
 
// para carregar formulário de criar condutor
const driver_c = (req, res) =>{
    // const _condutor = ctrl_condutores.novo_condutor
    res.render('condutor', {
        title: 'Condutor', 
        sub_title: 'novo', 
        // condutor: _condutor,
        rota: "/Condutor/C",
    });
}

const driver_r = async (req, res) => {
    const condutor = await ctrl_condutores.ficha_condutor(req.params.id);
    const faturacao_total = await ctrl_condutores.faturacao_total(req.params.id);
    const turnos_condutor = await ctrl_turnos.turnos_condutor(req.params.id);
    const turnos = await ctrl_condutores.faturacao_para_turnos(turnos_condutor);
    
    if(condutor){
        res.render('condutor', {
            title: 'Condutor', 
            sub_title: 'ficha', 
            condutor: await condutor,
            faturacao_total: faturacao_total,
            turnos: turnos,
            rota: '/Condutor/id'});
        }else{
            res
                .status(404)
                .json({"message": "documento não encontrado"});            
        }
};

const drivers_r = async (req, res) =>{
    const lista_condutores = await ctrl_condutores.lista_condutores();
    if(lista_condutores){
        res.render('condutores', {
            title: 'Condutores', 
            sub_title: 'lista',
            dados: lista_condutores,
            rota: req.path
        });
    }else{
        res
            .status(400)
            .json({"message": "não foi possível carregar documentos condutores"})
    }
};

const driver_u = async (req, res)=>{
    const condutor = await ctrl_condutores.ficha_condutor(req.params.id);
    const faturacao_total = await ctrl_condutores.faturacao_total(req.params.id);
    const turnos_condutor = await ctrl_turnos.turnos_condutor(req.params.id);
    const turnos = await ctrl_condutores.faturacao_para_turnos(turnos_condutor);    
    if(condutor){
        res.render('condutor', {
            title: 'Condutor', 
            sub_title: 'atualização', 
            condutor: await condutor,
            faturacao_total: faturacao_total,
            turnos:turnos,
            rota: '/Condutor/id/U'});
        }else{
            res
            .status(404)
            .json({"message": "documento não encontrado"});            
        }    
};

const driver_d = (req, res) =>{
    res.render('condutor', {
        title: 'Condutor', 
        sub_title:'eliminação', 
        rota: req.path
    });
};

const lista_turnos = async () => {

};

module.exports = {
    driver_c,
    drivers_r,
    driver_r,
    driver_u,
    driver_d
};