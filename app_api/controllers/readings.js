const mongoose = require('mongoose');
const Car = mongoose.model('Carros');

const atualiza_entrada_log_kms = (carro) => {
    if(carro.log_kms && carro.log_kms.length > 0) {
        const count = carro.log_kms.length;

    }
}

const atualiza_quilometragem = (carroid) => {
    Car.findById(carroid)
        .select('quilometros data')
        .exec((err, carro) => {
            if(!err){
                atualiza_entrada_log_kms(carro);
            }
        });
};

const atualiza_log_kms = (req, res) => {
    if(!req.params.carroid || !req.params.log_kms._id){                   // para testar a inexistência dos parâmetros necessários
        return res
            .status(404)
            .json({"message": "Não encontrado, necessários ambos _id's carro e log_kms" });
    }
    Car
        .findById(req.params.carroid)   // para procurar um documento
        .select('log_kms')
        .exec((err, carro) => {
            if(!carro){                 // para testar a inexistência do documento procurado
                return res
                    .status(404)
                    .json({"message": "Carro não encontrado" })
            }
            if(carro.log_kms && carro.log_kms.length > 0) {                     // para testar se existe a coleção de subdocumentos e se nela existem documentos
                const entrada_log = carro.log_kms.id(req.params.log_kmsid);     // para selecionar um documento da coleção de subdocumentos
                if(!entrada_log){                                               // para testar a inexistência de um documento devolvido  
                    res
                        .status(404)
                        .json({"message": "log de quilometragem não encontrado"});
                }else{
                    entrada_log.quilometros = req.body.quilometros;             // para atualizar os dados do subdocumento
                    entrada_log.data = req.body.data;
                    carro.save((err, carro) => {
                        if(err) {
                            res
                                .status(404)
                                .json(err);
                        }else {
                            atualiza_log_kms(carro._id);
                            res
                                .status(200)
                                .json(entrada_log)

                        }
                    });
                }
            }else{
                res
                    .status(404)
                    .json({ "message": "Não há uma entrada de log de kms para atualizar "});
            }
        });
};

// para inserir no documento carro um novo subdocumento log_kms com nova leitura de quilómetros
const insere_leitura = (req, res, carro) =>{
    if(!carro){ // para testar a inexistência de um documento carro válido 
        res
            .status(404)
            .json({"message": "Carro não encontrado"});
    }else{
        const quilometros = req.body.quilometros;   // para o valor do atributo quilometros o atributo data recebe a data atual
        carro.log_kms.push(quilometros);            // para inserir novo subdocumento no array
        carro.save((err, carro) => {                // para guardar o documento carro incluindo o subdocumento inserido
            if(err){                                // para o caso de ocorrerem erros durante a operação
                res
                    .status(400)
                    .json(err);
            }else{
                const esta_leitura = carro.log_kms.slice(-1).pop();     // para reter o subdocumento correspondente à leitura inserida
                res
                    .status(201)
                    .json(esta_leitura);            // para devolver o subdocumento
            }
        });
    }
};

/** para criar um novo subdocumento log_kms do documento carro */
const novo_log_kms = (req, res) => {
    const carroid = req.params.carroid;
    if(carroid){                            // para testar a existência de um _id de carro
        Car
            .findById(carroid)              // para procurar o documento carro com o _id indicado
            .select('log_kms')              // para selecionar o atributo array de subdocumentos
            .exec((err, carro) => {
                if(err){                    // para o caso de ocorrerem erros durante a execução
                    res
                        .status(400)
                        .json(err);
                } else{                     
                    insere_leitura(req, res, carro);    // para inserir o novo subdocumento em log_kms do documento carro
                }
            });
    } else{
        res
            .status(400)
            .json({"message": "Carro não encontrado"});
    }
};