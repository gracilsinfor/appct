const mongoose = require('mongoose');
const Viatura = mongoose.model('Viatura');

const nova_viatura = async (req, res, next) => {
    let dados = {};
    if (req.body.ev) {
        const { ev, q_b, n_r, desc, foto, ativa, odo } = req.body;
        dados = {
            ev: ev,
            q_b: q_b,
            n_r: n_r,
            desc: desc,
            foto: foto,
            ativa: ativa,
            odo: odo
        };
    } else {
        const { ev, n_r, desc, foto, ativa, odo } = req.body;
        dados = {
            ev: ev,
            n_r: n_r,
            desc: desc,
            foto: foto,
            ativa: ativa,
            odo: odo
        };
    }

    console.log(dados);
    const viatura = new Viatura(dados);

    try {
        const doc = await viatura.save();
        // console.log(doc)
        res
            .status(201)
            .json(doc)
        res.send;
    }
    catch (error) {
        next(error);
    }
};

const viatura_por_id = async (req, res, next) => {

    if (req.params.idv) {
        Viatura
            .findById(req.params.idv)
            .exec((err, viatura) => {
                if (!viatura) {
                    res
                        .status(404)
                        .json({ "message": "Id da viatura não encontrado!" });
                    return res.send;
                } else if (err) {
                    return next(err)
                }
                res
                    .status(200)
                    .json(viatura);
                return res.send
            })
    } else {
        res
            .status(404)
            .json({ "message": "O pedido não contém um id de viatura" });
        return res.send;
    }
};

const lista_viaturas = async function (err, res, next) {

    const viaturas = await Viatura.find();

    if (!viaturas || !viaturas.length) {
        res
            .status(404)
            .json({ "message": "Não foram encontradas viaturas na base de dados" });
        res.send;

    } else {
        res
            .status(200)
            .json(viaturas);
        res.send;
    }
};



const atualiza_viatura = async (req, res, next) => {

    if (req.params.idv) {
        const viatura = await Viatura.findById(req.params.idv).exec();
        if (viatura) {
            if (req.body.n_r) {
                if (req.body.ev) {
                    const { ev, q_b, n_r, desc, foto, ativa, odo } = req.body;
                    viatura.ev = ev;
                    viatura.q_b = q_b;
                    viatura.n_r = n_r;
                    viatura.desc = desc;
                    // viatura.foto = foto;
                    viatura.ativa = ativa;
                    viatura.odo = odo
                } else {
                    const { ev, n_r, desc, foto, ativa, odo } = req.body;
                    viatura.ev = ev;
                    viatura.n_r = n_r;
                    viatura.desc = desc;
                    // viatura.foto = foto;
                    viatura.ativa = ativa;
                    viatura.q_b = null;
                    viatura.odo = odo
                }
            }else{
                viatura.foto = req.body.foto;
            }
            await viatura.save();
            res
                .status(200)
                .json(viatura);
            res.send;

        } else if (err) {
            next(err);
        } else {
            res
                .status(404)
                .json({ "message": "Viatura não encontrada!" })
            res.send;
        }
    } else {
        res
            .status(422)
            .json({ "message": "Parâmetro inválido." })
        res.send;
    }
};



const elimina_viatura = (req, res) => {
    console.log("api entered elimina_viatura")
    res
        .status(200)
        .json({ "status": "success" });
    res.send;
};

/** subdocumentos manutenção */

const nova_manutencao = async (req, res) => {
    console.log("api entered nova_manutencao")
    res
        .status(200)
        .json({ "status": "success" });
    res.send;
};

const manutencao_por_id = (req, res) => {
    console.log("api entered manutencao_por_id")
    if (req.params && req.params.idviatura && req.params.idmanutencao) {
        Viatura
            .findById(req.params.idviatura)
            .select('n_r desc manuts')
            .exec((err, viatura) => {
                if (!viatura) {
                    res
                        .status(404)
                        .json({
                            "message": "Id de viatura não encontrado"
                        });
                    return;
                } else if (err) {
                    res
                        .status(404)
                        .json(err);
                    return;
                }
                if (viatura.manuts && viatura.manuts.length > 0) {
                    const manut = viatura.manuts.id(req.params.idmanutencao);
                    if (!manut) {
                        res
                            .status(404)
                            .json({
                                "message": "Id de manutenção não encontrado"
                            });
                    } else {
                        response = {
                            viatura: {
                                id_viatura: req.params.idviatura,
                                matricula: viatura.n_r,
                                viatura: viatura.desc
                            },
                            manutencao: manut
                        };
                        res
                            .status(200)
                            .json(response);
                    }
                } else {
                    res
                        .status(404)
                        .json({
                            "message": "Não foram encontradas manutenções"
                        });
                }
            });
    } else {
        res
            .status(404)
            .json({
                "message": "Não encontrado, necessários Id de viatura e Id de manutenção válidos"
            });
    }
};

const atualiza_manutencao = (req, res) => {
    console.log("api entered atualiza_manutencao")
    res
        .status(200)
        .json({ "status": "success" });
    res.send;
};

const elimina_manutencao = (req, res) => {
    console.log("api entered elimina_manutencao")
    res
        .status(200)
        .json({ "status": "success" });
    res.send;
};

module.exports = {
    nova_viatura,
    lista_viaturas,
    viatura_por_id,
    atualiza_viatura,
    elimina_viatura,
    nova_manutencao,
    manutencao_por_id,
    atualiza_manutencao,
    elimina_manutencao,
}