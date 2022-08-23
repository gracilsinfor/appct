const request = require('request');

const api_opts = { server: 'http://localhost:3000' }

if (process.env.NODE_ENV === 'production') { api_opts.server = 'http://nameless-river-78172.herokuapp.com' }

// para apresentar o formulário criar carrro
// const car_c = function (req, res) {
//     res.render('carro', {
//         title: 'Viatura',
//         sub_title: 'nova',
//         rota: "/Viatura/C",
//     });
//     res.end;
// };

/** para apresentar um documento carro */
const car_r = async (req, res, next) => {

    const rota = `/api/viaturas/${req.params.idviatura}`;
    const req_opts = {
        url: `${api_opts.server}${rota}`,
        method: 'GET',
        json: {}
    };
    request(
        req_opts,
        (err, response, body) => {
            let dados = body;
            if (response.statusCode === 200) {
                res.render('carro', {
                    title: 'Viatura',
                    sub_title: 'ficha',
                    viatura: dados,
                    rota: '/Viatura/id',
                });
                return res.end;
            } else if (response.statusCode === 400) {
                res.redirect(`/viaturas?err=val`);
            } else {
                next(err);
            }
        }
    );

}

/** para ver lista de documentos carro */
// const cars_r = async function(req, res) {
//     _cars_r(req, res, _cars_render);
// }

// const _cars_r = async function (req, res, next) {

//     const path = '/api/Viaturas';
//     const req_opts = {
//         url: `${api_opts.server}${path}`,
//         method: 'GET',
//         json: {}
//     };

//     request(
//         req_opts, 
//         (err, response, body) => {
//             if(response.statusCode === 200 && body.length){
//                 next(req, res,  body);
//             }else{
//                 console.log(res.statusCode);
//                 _showError(req, res, res.statusCode);
//             }
//         }
//     );
// }



/** para ver um documento carro para atualização */
const car_u = async (req, res, next) => {

    // if(viatura.ev){
    //     arr_titulos_abastecimento.push("id", "Turno", "Inicio", "t Q", "Q Total", "Custo");
    // }else{
    //     arr_titulos_abastecimento.push("id", "Turno", "Data", "Quant (L)", "Custo");
    // }
    const rota = `/api/viaturas/${req.params.idviatura}`;
    const req_opts = {
        url: `${api_opts.server}${rota}`,
        method: 'GET',
        json: {}
    };
    request(
        req_opts,
        (err, response, body) => {
            let dados = body;
            if (response.statusCode === 200) {
                res.render('carro', {
                    title: 'Viatura',
                    sub_title: 'atualizar',
                    viatura: dados,
                    rota: '/Viatura/id/U',
                });
                return res.end;
            } else if (response.statusCode === 400) {
                res.redirect(`/viaturas?err=val`);
            } else {
                next(err);
            }
        }
    );
}

// para apagar carro
const car_d = (req, res) => {
    res.render('carro', { title: 'Carro' });
}

const _showError = function (req, res, status, next) {
    // let title = '';
    // let content = '';
    // if (status === 404) {
    //     title = '404, page not found';
    //     content = 'Apparently we can\'t find this page. Sorry.';
    // } else {
    //     title = `${status}, something's gone wrong`;
    //     content = 'Something, somewhere, has gone just a little bit wrong.';
    // }
    // res.status(status);
    // res.render('error', {
    //     title: title,
    //     content: content
    // });
    return next(status);
};

module.exports = {
    car_c,
    // cars_c,
    car_r,
    // cars_r,
    car_u,
    car_d
}
