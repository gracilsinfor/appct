const mongoose = require('mongoose');
const Viatura = require('../models/Viatura');
const ViaturaEV = require('../models/Viatura_EV');
// const Viatura = mongoose.model('Viatura');

const nova_viatura = async (req, res, next) => {
    const dados = {
        nr: req.body.nr,
        dsc: req.body.dsc,
        fto: req.body.fto,
        estd: req.body.estd,
        odo: req.body.odo,
        qb: req.body.qb
    };

    console.log(dados);
    const viatura = dados.qb ? new ViaturaEV(dados) : new Viatura(dados);
    // const viatura = new Viatura(dados);

    try {
        const doc = await viatura.save();
        // console.log(doc)
        res
            .status(201)
            .json(doc)
        res.send;
    }
    catch (error) {
        console.log(error);
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
            .status(204)
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
            if (req.body.nr) {
                if(viatura.qb && !req.body.qb){
                    viatura.set('qb', undefined, {strict: false});
                    console.log('qb bd', viatura.qb, 'qb body ', req.body.qb)
                     
                }else if(!viatura.qb && req.body.qb){
                    viatura.set('qb', req.body.qb, Number, {strict: false});
                }else{
                    viatura.qb = req.body.qb
                }
                viatura.nr = req.body.nr;
                viatura.dsc = req.body.dsc;
                viatura.estd = req.body.estd;
                viatura.odo = req.body.odo;
        
            } else {

                viatura.fto = req.body.foto;
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
            .select('nr desc manuts')
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
                                matricula: viatura.nr,
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

