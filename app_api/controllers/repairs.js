const mongoose = require('mongoose');
const Manut = mongoose.model('Manutencao');
const Viat = mongoose.model('Viatura');

const lista_manutencoes = async function (req, res, next) {

    const viats = await Viat.find();

    if(!viats){
        res
            .status(204)
            .json({ 
                "message": "Não foram encontradas vaturas na base de dados" 
            });
        return res.send;
    }

    const manuts = await Manut.find();

    if (!manuts || !manuts.length) {
        res
            .status(204)
            .json({ 
                "message": "Não foram encontradas manutenções na base de dados" 
            });
        return res.send;
    } else {
        res
            .status(200)
            .json({
                dd_viats: viats,
                manutencoes: manuts
            });
        return res.send;
    }
};

const manutencao_por_id = (req, res) => {
    res
        .status(200)
        .json({ "status": "success" });
};

const nova_manutencao = (req, res) => {
    res
        .status(200)
        .json({ "status": "success" });
};

const manutencoes_por_viatura = (req, res) => {
    res
        .status(200)
        .json({ "status": "success" });
};

const manutencao_da_viatura = (req, res) => {
    res
        .status(200)
        .json({ "status": "success" });
};

const atualiza_manutencao = (req, res) => {
    res
        .status(200)
        .json({ "status": "success" });
};

const elimina_manutencao = (req, res) => {
    res
        .status(200)
        .json({ "status": "success" });
};

module.exports = {
    lista_manutencoes,
    manutencao_por_id,
    nova_manutencao,
    manutencoes_por_viatura,
    manutencao_da_viatura,
    atualiza_manutencao,
    elimina_manutencao
}
