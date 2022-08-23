const request = require('request');
const api_opts = { server: 'http://localhost:3000' }

if (process.env.NODE_ENV === 'production') { api_opts.server = 'http://nameless-river-78172.herokuapp.com' }

const render_viatura = (req, res) => {
    switch (req.method){
        case "GET":
            res.render('carro', {
                title: 'Viatura',
                sub_title: 'nova',
                rota: "/Viatura/C",
            });
            return;

        case "POST":
            const dados = req.body.viatura;
            res.render('carro', {
                title: 'Viatura',
                sub_title: 'ficha',
                viatura: dados,
                rota: '/Viatura/id',
            });
            return;

        case "u":
            break;
        case "d":
            break;
        default:
    }
}

const get_dados_viatura = function (req, res, next) {
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
                render_viatura("r", dados);
                next();
            } else {
                next(err);
            }
        }
    );

};

module.exports = {
    get_dados_viatura,
    render_viatura,
}
