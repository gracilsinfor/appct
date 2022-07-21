const mongoose = require('mongoose');
const Car = require('../models/Carro');

const lista_carros=(req, res)=>{ 
    res
        .status(200)
        .json({"status" : "arre"})
        .render('carros', {title: 'Carro', sub_title: 'Novo registo', rota: "Car/C"});
};

const novo_carro=(req, res) => {
    Car.create({                            // para o mongoose gerar um documento do modelo carro
        matricula: req.body.matricula,      // para atribuir valor aos atributos do documento
        descricao: req.body.descricao,
        ev: req.body.ev,
        data_entrada_servico: req.body.data_entrada_servico,
        kms_entrada_servico: req.body.kms_entrada_servico,
        kms_revisao: req.body.kms_revisao,
        data_revisao: req.body.data_revisao,
        ativo: req.body.ativo,
        imagem: req.body.imagem 
    },
        (err, carro) => {                   // para testar se ocorreram erros ao criar documento
            if(err){
                res
                    .status(400)
                    .json(err);
            } else {
                res 
                    .status(200)
                    .json(carro)           // para devolver objecto com o documento inserido
                    .render('carro', {title: 'Carro', sub_title: 'Novo registo', rota: 'Car/C'});
                }
        }
    );
};

const ver_carro=(req, res) => { 
    Car
        .findById(req.params.carroid)
        .exec((err, car) => {
            if(!carro){
                return res
                    .status(404)
                    .jason({"message": "documento não encontrado"});
            } else if(err) {
                return res
                    .status(404)
                    .json(err);
            }
            res
                .status(200)
                .json(carro);
        });
};

// para atualizar um documento carro e dos seus subdocumentos 
const atualiza_carro = (req, res) => { 
    if(!req.params.carroid){                // para testar a inexistência do _id do carro
        return res
            .status(404)
            .json({ "message": "Não encontrado, é necessário um _id de carro" });
    }
    Car                                     // para usar o modelo mongoose de Carros 
        .findById(req.params.carroid)       // para procurar o documento Carro com o _id especificado
        .select('-log_kms')                 // para o resultado da procura excluir o atributo array de subdocumentos log_kms 
        .exec((err, carro) => {             // para executar a procura do carro
            if(!carro){                     // para testar a inexistência de um documento carro encontrado
                return res
                    .json(404)
                    .status({ "message": "carroid não encontrado"});
            } else if (err) {               // para testar outros erros diferentes de documento inválido
                return res
                    .status(400)
                    .json(err);
            }
            carro.matricula = req.body.matricula;       // para atualizar os atributos do documento carro encontrado 
            carro.descricao = req.body.descricao;
            carro.ev = req.body.ev;
            carro.data_entrada_servico = req.body.data_entrada_servico;
            carro.kms_entrada_servico = req.body.kms_entrada_servico;
            carro.kms_revisao = req.body.kms_revisao;
            carro.data_revisao = req.body.data_revisao;
            carro.ativo = req.body.ativo;
            carro.imagem = req.body.imagem;
            
            carro.save((err, carro) =>{                 // para guardar as atualizações do documento carro
                if(err){                                // para o caso de ocorrerem erros durante a operação
                    res
                        .status(400)
                        .json(err);
                } else {
                    res 
                        .status(200)
                        .json(carro);                   // para devolver na resposta o documento carro atualizado 
                }
            }); 
        });
};


const elimina_carro=(req, res)=>{ 
    res
        .status(200)
        .json({"status" : "success"});
};

// Car
//     .findById(carroid)
//     .exec((err, carro)=>{
//         console.log("findById completo");
//     });

module.exports = {
    novo_carro,
    ver_carro,
    lista_carros,
    atualiza_carro,
    elimina_carro
};