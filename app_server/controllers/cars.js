const ctrl_viaturas = require('./teste_viaturas');
const request = require('request');

// const apiOptions ={server: 'http://localhost:3000'};

// para o tratamento de erros
const showError = (req, res, status) => {
    let title = '';
    let content = '';
  
    if (status === 404) {
      title = '404, página não encontrada';
      content = 'Pelo menos aparentemente, não fomos competentes. Sorry';
    } else {
      title = `${status}, algo não correu como esperado`;
      content = 'Alguma coisa, em algum sítio, não correspondeu às expectativas.';
    }
    res.status(status);
    res.render('index', {
      title,
      content
    });
}

// para criar novo documento carro
const car_c = (req, res) =>{
    res.render('carro', {
        title: 'Viatura', 
        sub_title: 'nova', 
        rota: '/Viatura/C',
    });
}

// function get_heads(obj){
//     const arr = Object.getOwnPropertyNames(obj[0]);
//     // console.log(arr);
//     return arr;
// };

/** para ver um documento carro */
const car_r = async (req, res) => {
    const viatura = await ctrl_viaturas.viatura_por_id(req.params.id);
    const manutencoes = await viatura.manutencoes_da_viatura();
    const abastecimentos = await viatura.abastecimentos_da_viatura();
    const arr_titulos_abastecimento = [];
    if(viatura.ev){
        arr_titulos_abastecimento.push("id", "Turno", "Inicio", "t Q", "Q Total", "Custo");
    }else{
        arr_titulos_abastecimento.push("id", "Turno", "Data", "Quant (L)", "Custo");
    }

    if (viatura){
        res.render('carro', {
            title: 'Viatura', 
            sub_title: 'Ficha', 
            viatura: viatura.as_object,
            manutencoes: manutencoes,
            titulos: arr_titulos_abastecimento,
            abastecimentos: abastecimentos,
            rota: '/Viatura/id',
        });
    }else{
        res
            .status(404)
            .json({"message": "documento não encontrado"});
    }
}

/** para ver lista de documentos carro */
async function cars_r (req, res) {
    const viaturas = await ctrl_viaturas.lista_viaturas();
    res.render('carros', {
        title:'Viaturas', 
        sub_title:'lista', 
        viaturas: viaturas, 
        rota: req.path
    });
}

/** para ver um documento carro para atualização */
const car_u = async (req, res)=>{
    const viatura = await ctrl_viaturas.viatura_por_id(req.params.id);
    const manutencoes = await viatura.manutencoes_da_viatura();
    const abastecimentos = await viatura.abastecimentos_da_viatura();
    const arr_titulos_abastecimento = [];
    if(viatura.ev){
        arr_titulos_abastecimento.push("id", "Turno", "Inicio", "t Q", "Q Total", "Custo");
    }else{
        arr_titulos_abastecimento.push("id", "Turno", "Data", "Quant (L)", "Custo");
    }
    if (viatura){
        res.render('carro', {
            title: 'Viatura', 
            sub_title: 'atualização', 
            viatura: viatura.as_object,
            manutencoes: manutencoes,
            titulos: arr_titulos_abastecimento,
            abastecimentos: abastecimentos,
            rota: '/Viatura/id/U'});
    }else{
        res
            .status(404)
            .json({"message": "documento não encontrado"});
    }
}

// para apagar carro
const car_d =(req,res)=>{
    res.render('carro', {title: 'Carro'});
}

module.exports = {
    car_c,
    car_r,
    cars_r,
    car_u,
    car_d
}