const express = require('express');
const appv = express.Router();

const request = require('request');

const multer = require('multer');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const FOTO_W = 400;
const FOTO_H = 300;

/** para configuração do ambiente api */
const server_opts = { server: 'http://localhost:3000' }
if (process.env.NODE_ENV === 'production') { server_opts.server = 'http://nameless-river-78172.herokuapp.com' };


appv.get('/c', (req, res, next) => {
    res.render('carro', {
        title: 'Viatura',
        sub_title: 'nova',
        rota: "/Viatura/C",
    });
    res.end;
});

appv.get('/', (req, res, next) => {

    const rota = '/api/viaturas';
    const req_opts = {
        url: `${server_opts.server}${rota}`,
        method: 'GET',
        json: {}
    };
    request(
        req_opts,
        (err, response, body) => {
            let dados = body;
            if (response.statusCode === 200) {
                res.render('carros', {
                    title: 'Viaturas',
                    sub_title: 'lista',
                    viaturas: dados,
                });
                return res.end;
            } else if (response.statusCode === 400) {
                res.redirect(`/viaturas?err=val`);
            } else {
                next(err);
            }
        }
    );

});


//  para uploads
const storage = multer.diskStorage({
    limits: { fileSize: 104800 },
    destination: function (req, file, next) {
        next(null, './app_server/upload/fotos/viaturas');
    },
    filename: function (req, file, next) {
        next(null, file.originalname);
    }
});

const fileFilter = (req, file, next) => {
    const fileTypes = /jpeg|jpg|png|gif/;
    const mimetype = fileTypes.test(file.mimetype);
    const extName = fileTypes.test(path.extname(file.originalname));
    const fName = file.originalname
    if (!mimetype || !extName) {
        return next(new Error("Tipo de ficheiro não suportado"));
    }
    return next(null, true);
}
const upload = multer({ storage: storage, fileFilter: fileFilter });


appv.post('/', upload.single('inpFileImg'), async (req, res, next) => {

    const prefixo_unico = await req.body.matricula;
    const nome_original = req.file.filename;
    const nome_bd = `${prefixo_unico}_${nome_original}`;

    // para redimensionar e guardar a foto carregada
    await sharp(req.file.path)
        .resize(FOTO_W, FOTO_H, 'inside')
        .jpeg({ quality: 90 })
        .toFile(
            path.resolve(`${req.file.destination}`, `${nome_bd}`)
        )
    fs.unlinkSync(req.file.path)

    const post_data = {
        n_r: String(req.body.matricula).toUpperCase(),
        desc: req.body.descricao,
        foto: String(nome_bd).toUpperCase(),
        ativa: true,                              // uma viatura nova fica sempre ativa
        odo: parseInt(req.body.odometro)
    };
    console.log("chkev:", req.body.chkEv, "qb:", req.body.qbateria, "desc:", req.body.descricao);
    if (req.body.chkEv) {
        post_data.ev = true;
        post_data.q_b = req.body.qbateria;
    } else {
        post_data.ev = false;
    }

    let rota_api = '/api/viaturas';
    let req_opts = {
        url: `${server_opts.server}${rota_api}`,
        method: 'POST',
        json: post_data
    };

    if (!post_data.n_r || !post_data.desc || !post_data.foto || !post_data.odo) {
        res.redirect(`/viaturas?err=val`)
    } else {
        request(
            req_opts,
            (err, response, body) => {
                if (response.statusCode === 201) {
                    return res.redirect(`${server_opts.server}/viaturas/${response.body._id}`);
                } else if (response.statusCode === 400) {
                    res.redirect(`/viaturas?err=val`);
                } else {
                    next(err);
                }
            }
        );
    }
});


appv.get('/:idv', (req, res, next) => {
    const rota = `/api/viaturas/${req.params.idv}`;
    const req_opts = {
        url: `${server_opts.server}${rota}`,
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
});


appv.post('/:idv', upload.single('inpFileImg'), async (req, res, next) => {

    const prefixo_unico = await req.body.fileNameH;
    const nome_original = req.file ? req.file.filename : '';
    const nome_bd = req.file ? `${prefixo_unico}_${nome_original}` : '';
    const post_data = {};

    if (req.file) {
        // para redimensionar e guardar a foto carregada
        await sharp(req.file.path)
            .resize(FOTO_W, FOTO_H, 'inside')
            .jpeg({ quality: 90 })
            .toFile(
                path.resolve(`${req.file.destination}`, `${nome_bd}`)
            )
        fs.unlinkSync(req.file.path);

        post_data.foto = nome_bd;

    } else {
        post_data.ativa = req.body.chkAtiva === 'on' ? true : false;
        post_data.n_r = String(req.body.matricula).toUpperCase();
        post_data.desc = req.body.descricao;
        post_data.odo = req.body.odometro
    }

    if (req.body.chkEv === 'on') {
        post_data.ev = true;
        post_data.q_b = req.body.qbateria;
    } else {
        post_data.ev = false;
    }

    const rota_api = `/api/viaturas/${req.params.idv}`;
    const req_opts = {
        url: `${server_opts.server}${rota_api}`,
        method: 'POST',
        json: post_data
    };

    if (!post_data.foto && !post_data.n_r) {
        res.redirect(`/viaturas?err=val`)
    } else {
        request(
            req_opts,
            (err, response, body) => {
                if (response.statusCode === 200) {
                    return res.redirect(`${server_opts.server}/viaturas/${response.body._id}`);
                } else if (response.statusCode === 400) {
                    res.redirect(`/viaturas?err=val`);
                } else {
                    next(err);
                }
            }
        );
    }
});



const _showError = function (req, res, status, next) {
    let title = '';
    let content = '';
    if (status === 404) {
        title = '404, não foi encontrada a página';
        content = 'aparentemente não foi possível encontrar a página';
    } else {
        title = `${status}, ocorreu um erro inesperado`;
        content = 'Something, somewhere, has gone just a little bit wrong.';
    }
    res.status(status);
    res.render('error', {
        title: title,
        content: content
    });
    return;
};



module.exports = appv;