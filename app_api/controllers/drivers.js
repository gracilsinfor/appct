const mongoose = require('mongoose');
const Condutor = mongoose.model('Condutor')
const assert = require('assert');

const novo_condutor = async (req, res, next) => {
    const { nome, nif, tel, email, entrada, kms, estado, foto } = req.body;
    const dados = {
        nome: nome,
        nif: nif,
        tel: tel,
        email: email,
        entrd: entrada,
        kms: kms,
        estd: estado,
        fto: foto
    };

    // console.log('api dados',dados);

    const condutor = new Condutor(dados);

    try {
        const doc = await condutor.save();
        res
            .status(201)
            .json(doc)
        res.send;
    }
    catch (error) {
        console.log('api', error);
        next(error);
    }
};


const condutor_por_id = async (req, res, next) => {
    if (req.params.idc) {
        Condutor
            .findById(req.params.idc)
            .exec((err, condutor) => {
                // console.log(condutor)
                if (!condutor) {
                    res
                        .status(404)
                        .json({ "message": "Id do condutor não encontrado!" });
                    res.send;
                } else if (err) {
                    next(err)
                }
                res
                    .status(200)
                    .json(condutor);
                res.send
            })
    } else {
        res
            .status(404)
            .json({ "message": "O pedido não contém um id de condutor" });
        res.send;
    }
};

const lista_condutores = async (req, res, next) => {
    const condutores = await Condutor.find();

    if (!condutores || !condutores.length) {
        res
            .status(204)
            .json({ "message": "Não foram encontrados condutores na base de dados" });
        res.send;
    } else {
        res
            .status(200)
            .json(condutores);
        res.send;
    }
};


const atualiza_condutor = async (req, res, next) => {
    if (req.params.idc) {
        const condutor = await Condutor.findById(req.params.idc).exec();
        if (condutor) {
            if (req.body.nif) {
                const { nome, nif, tel, email, entrada, ativo } = await req.body;
                condutor.nome = nome;
                condutor.nif = nif;
                condutor.tel = tel;
                condutor.email = email;
                condutor.entrd = entrada;
                condutor.est = ativo;
                condutor.kms = condutor.kms;
            } else {
                condutor.fto = req.body.foto;
            }
            await condutor.save();
            res
                .status(200)
                .json(condutor);
            res.send;

        } else if (err) {
            next(err);
        } else {
            res
                .status(404)
                .json({ "message": "Condutor não encontrado!" });
            res.send;
        }
    } else {
        res
            .status(422)
            .json({ "message": "Parâmetro inválido." });
        res.send;
    }
};

const elimina_condutor = (req, res) => {
    res
        .status(200)
        .json({ "status": "success" });
};


module.exports = {
    lista_condutores,
    novo_condutor,
    condutor_por_id,
    atualiza_condutor,
    elimina_condutor
}