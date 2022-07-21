const mongoose = require('mongoose');
const Car = mongoose.model('Carro');
const Rev = mongoose.model('Revisao');

function novo_documento(req, res, ){
    
};  

const _guardar_subdocumento = (req, res, doc, sub_doc, sub_doc_props)=>{
    if (!doc) {
        res
          .status(404)
          .json({"message": "documento " + doc + " não encontrado"});
        } else {
            const Obj = mongoose.model(doc.collection.collectionName)
            const sub_documento = sub_doc; 
            const props_sub_doc = sub_doc_props;

            sub_documento.push(props_sub_doc);

            doc.save((err, doc) => {
            if (err) {
                res
                .status(400)
                .json(err);
            } else {
                const este_sub_doc = doc.sub_documento.slice(-1).pop();
                res
                .status(201)
                .json(este_sub_doc);
            }
            });
        }    
};

const novo_subdocumento = (req, res, doc, sub_doc, sub_doc_props)=>{
    const id_doc = req.params.iddoc;
        if(!id_doc){
            Obj
                .findById(id_doc)
                .select({ campos })
                .exec((err, doc) => {
                    if(err){
                        res
                            .status(400)
                            .json(err);
                    }else{
                        const este_documento = _guardar_subdocumento(req, res, doc);
                        res
                            .status(200)
                            .json(este_documento)
                            .render({template: 'template'}, {title: documento, sub_title: accao});
                    }
                });
        } else{
            res
                .status(404)
                .json({"message": "documento " + documento + " não encontrado"});
        }
    
};  

function ver_documentos(req, res){

};

function ver_documento(req, res){

};

function ver_subdocumento(req, res){

};

function ver_subdocumentos(req, res){

};

function atualizar_documento(req, res){

};

function atualizar_subdocumento(req, res){

};

function eliminar_documento(req, res){

};

function eliminar_documentos(req, res){

};

function eliminar_subdocumento(req, res){

};

function eliminar_subdocumento(req, res){

};














