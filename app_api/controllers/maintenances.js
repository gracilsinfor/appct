const req = require('express/lib/request');
const res = require('express/lib/response');
const mongoose = require('mongoose');

/** para registo de nova revisão */
const _guardar_revisao = (req, res, carro) => {
    if (!carro) {
        res
          .status(404)
          .json({"message": "documento carro não encontrado"});
      } else {
        const {data_inicio, oficina, obs } = req.body;
        carro.revisoes.push({
          data_inicio,
          oficina,
          obs
        });
        carro.save((err, carro) => {
          if (err) {
            res
              .status(400)
              .json(err);
          } else {
            const esta_revisao  = carro.revisoes.slice(-1).pop();
            res
              .status(201)
              .json(esta_revisao);
          }
        });
      }
};

/** para adicionar novo subdocumento revisão a um documento carro */
const nova_revisao = (req, res) => {
    const id_carro = req.params.idcarro;
        if(!id_carro){
            Car
                .findById(id_carro)
                .select('revisoes')
                .exec((err, carro) => {
                    if(err){
                        res
                            .status(400)
                            .json(err);
                    }else{
                        const esta_revisao = _guardar_revisao(req, res, carro);
                        res
                            .status(200)
                            .json(esta_revisao)
                            .render('revisao', {title: "Revisão" , sub_title: "novo"});
                    }
                });
        } else{
            res
                .status(404)
                .json({"message": "documento carro não encontrado"});
        }
};

/** para listar os subdocumentos revisão de um carro 
    com sucesso, retorna array revisões de um documento carro */
    const lista_revisoes = (req, res) => {
        Car
            .findById(req.params.idcarro)
            .select('revisoes')
            .exec((err, carro) => {
                if(!carro){
                    return res
                        .status(404)
                        .json({"message": "documento carro não encontrado"});
                }else if(err){
                    return res
                        .status(400)
                        .json(err);
                }
                if(carro.revisoes && carro.revisoes.length > 0){
                    const estas_revisoes = carro.revisoes;
                    if(!estas_revisoes){
                        return res
                            .status(404)
                            .json({"message": "subdocumentos revisão não encontrados"});
                    }else{
                        return res
                            .status(200)
                            .json(estas_revisoes)
                            .render('revisoes', {title: "Revisoes", subtitle: "lista"});
                    }
                }
            });
};

/** para listar um subdocumento revisão de um documento carro */
const ver_revisao = (req, res) => {
    Car
        .findById(req.params.idcarro)       // para procurar um documento carro
        .select('revisoes')                 // para obter os subdocumentos revisao
        .exec((err, carro) => {
            if (!carro) {
                return res
                    .status(404)
                    .json({"message": "documento carro não encontrado"});
            } else if (err) {
                return res
                    .status(400)
                    .json(err);
            }
            if (carro.revisoes && carro.revisoes.length > 0) {
                const rev = carro.revisoes._id(req.params.idrevisao);
                if (!rev) {
                    return res
                        .status(404)
                        .json({"message": "subdocumento revisão não encontrado"});
                } else {
                    const response = {      // para formar um subdocumento resposta 
                        revisao: {
                            data_inicio: rev.data_inicio,
                            oficina: rev.oficina,
                            obs: rev.obs,
                            data_fim: rev.data_fim,
                            proxima_revisao: rev.proxima_revisao,
                            id: rev._id
                        }
                    };
                    return res
                        .status(200)
                        .json(response)
                        .render('revisao', {title: "Revisão", subtitle: "ficha"});
                }
            } else {
                return res
                    .status(404)
                    .json({"message": "o documento carro não contém subdocumentos revisão"});
            }
        });
};

const atualiza_revisao = (req, res) => {
    if(!req.params.idcarro || !req.params.idrevisao){
        return res
            .status(404)
            .json({"message": "documento carro ou subdocumento revisão não encontrado"});
    }
    Car
        .findById(req.params.idcarro)
        .select('revisoes')
        .exec((err, carro) => {
            if(!carro){
                return res
                    .status(404)
                    .json({"message": "documento carro não encontrado "});
            }else if(err){
                return res
                    .status(400)
                    .json(err);
            }
            if(carro.revisoes && carro.revisoes.length > 0){
                const esta_revisao = carro.revisoes._id(req.params.idrevisao);
                if(!esta_revisao){
                    res
                        .status(404)
                        .json({"message": "documento revisão não encontrado"});
                }else{
                    esta_revisao.data_inicio = req.body.data_inicio;
                    esta_revisao.oficina = req.body.oficina;
                    esta_revisao.obs = req.body.obs;
                    esta_revisao.data_fim = req.body.data_fim;
                    carro.save((err, carro) => {
                        if(err){
                            res
                                .status(400)
                                .json(err);
                        }else{
                            res
                                .status(201)
                                .json(esta_revisao)
                                .render('revisao', {
                                    title:'Revisão',
                                    sub_title: 'atualização'
                                });
                        }
                    });
                }
            }
        });
};

const elimina_revisao = (req, res) => {

}

module.exports = {
    nova_revisao,
    lista_revisoes,
    ver_revisao,
    atualiza_revisao,
    elimina_revisao
};
