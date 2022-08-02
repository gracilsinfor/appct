// const ctrl_viaturas = require('./teste_viaturas');
const request = require('request');

const apiOptions = {
    server: 'http://localhost:3000'
};
if(process.env.NODE_ENV === 'production'){
    apiOptions.server = 'http://nameless-river-78172.herokuapp.com'
}

/** controlador em app_server */
/** GET 'home' page */
const homelist = function(req, res){
    const path = '/api/locations';
    // opções do request redirecionado para o controlador da api
    const requestOptions = {
        url : apiOptions.server + path,   // route do request à api
        method : 'GET',                   // metodo
        json : {},                        // eventuais dados
        qs : {                            // query string
            lng : -0.7992599,
            lat : 51.378091,
            maxDistance : 20
        }
    };
    /** faz o request à api 
     *  envia:
     *      opções do pedido
     *      callback que recebe:
     *          erros,
     *          resposta/status
     *          dados */
    request(
        requestOptions,
        (err, response, body) => {    // callback executada na resposta da api
            let data = body;            // recebe os dados da resposta
        
            /**  caso resposta com sucesso e existam dados*/
            if (response.statusCode === 200 && data.length) {
                
                /** atua sobre os dados enviados com a resposta */
                for (let i = 0; i < data.length; i++) {

                    // data[i].distance = _formatDistance(data[i].distance);
                }
            }
            /** chama função para visualizar a resposta da api */
            _renderHomepage(req, res, data);
        }
    );
  };

  /** para renderizar a home página */
  const _renderHomepage = function(req, res, responseBody){
    let message = null;

    /** caso a resposta não seja um array */
    if (!(responseBody instanceof Array)) {
        message = 'API lookup error';
        responseBody = [];
    } else {
    /** caso a resposta seja um array vazio */
      if (!responseBody.length) {
        message = 'No places found nearby';
      }
    }
    res.render('locations-list', {
      title: 'Loc8r - find a place to work with wifi',
      pageHeader: {
        title: 'Loc8r',
        strapline: 'Find places to work with wifi near you!'
      },
      sidebar: 'Looking for wifi and a seat? Loc8r helps you find places to work when out and about. Perhaps with coffee, cake or a pint? Let Loc8r help you find the place you\'re looking for.',
      locations: responseBody,
      message: message
    });
  };

const add_car = (req, res) =>{
    console.log("entered add-car-app")
    _car_c(req, res, (req, res) => {
        _render_car(req, res);
    });
}

//** para renderizar form novo documento carro */
const _car_c = function (req, res) {
    console.log("entered cars-app")
    const rota ='api/Viaturas/Nova';
    const request_opts = {
        url: `${api_options.server}${rota}`,
        method: 'GET',
        json: {}
    };
    console.log(request_opts.url);
    request(
        request_opts,
        (err, response) => {
            if(response.statusCode === 200){
                callback(req, res)
            }else{
                _showError(req, response, response.statusCode);
            }
        });
}

const _render_car = function(err, response, boddy){
    res.render('carro', {
        title: 'Viatura',
        sub_tilte: 'nova', 
        pageHeader: { title: 'Nova viatura' },
        error: req.query.err,
        rota: "/Viatura/C",
    });   
}

const exec_car_c = function (req, res){
    // const locationid = req.params.locationid;
    // const path = '/api/Viaturas/';
    // const postdata = {
    // //   author: req.body.name,
    // //   rating: parseInt(req.body.rating, 10),
    // //   reviewText: req.body.review
    // };
    // const requestOptions = {
    //   url : apiOptions.server + path,
    //   method : 'POST',
    //   json : postdata
    // };
    res.render('carros', {
    
    })
}


/** para ver um documento carro */
const car_r = async (req, res) => {
    const viatura = await ctrl_viaturas.viatura_por_id(req.params.id);
    const manutencoes = await viatura.manutencoes_da_viatura();
    const abastecimentos = await viatura.abastecimentos_da_viatura();
    const arr_titulos_abastecimento = [];
    if(viatura.ev){
        arr_titulos_abastecimento.push("id", "turno", "inicio", "t Q", "Q total", "custo");
    }else{
        arr_titulos_abastecimento.push("id", "turno", "data", "quant (L)", "custo");
    }

    if (viatura){
        res.render('carro', {
            title: 'Viatura', 
            sub_title: 'Ficha', 
            viatura: await viatura.as_object,
            manutencoes: await manutencoes,
            titulos: arr_titulos_abastecimento,
            abastecimentos: await abastecimentos,
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

/** métodos privados */

const _get_carro_info = function(req, res, callback){
    const path = `/api/Viaturas/${req.params.locationid}`;
    const requestOptions = {
        url : apiOptions.server + path,
        method : 'GET',
        json : {}
    };
    request(
        requestOptions,
        (err, response, body) => {
            const data = body;
            if (response.statusCode === 200) {
            //   data.coords = {
            //     lng : body.coords[0],
            //     lat : body.coords[1]
            //   };                                
                callback(req, res, data);
            } else {
                _showError(req, res, response.statusCode);
            }
        }
    );
}

const _showError = function (req, res, status) {
    let title = '';
    let content = '';
    if (status === 404) {
      title = '404, page not found';
      content = 'Looks like we can\'t find this page. Sorry.'; 
    } else {
      title = `${status}, something's gone wrong`;
      content = 'Something, somewhere, has gone just a little bit wrong.';
    }
    res.status(status);
    res.render('generic-text', {
      title : title,
      content : content
    });
  };

module.exports = {
    add_car,
    exec_car_c,
    car_r,
    cars_r,
    car_u,
    car_d
}