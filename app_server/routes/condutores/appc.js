const express = require('express');
const appc = express.Router();

const request = require('request');

const multer = require('multer');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const FOTO_W = 240;
const FOTO_H = 320;

/** para configuração do ambiente api */
const server_opts = { server: 'http://localhost:3000' }
if (process.env.NODE_ENV === 'production') { server_opts.server = 'http://nameless-river-78172.herokuapp.com' };


appc.get('/condutor', (req, res, next) => {
	res.render('condutor', {
		title: 'Condutor',
		sub_title: 'novo',
		rota: "/Condutor/C",
	});
});

appc.get('/', (req, res, next) => {

	const rota = '/api/condutores';
	const req_opts = {
		url: `${server_opts.server}${rota}`,
		method: 'GET',
		json: {}
	};
	request(
		req_opts,
		(err, response, body) => {
			const dados = body;
			if (response.statusCode === 200) {
				res.render('condutores', {
					title: 'Condutores',
					sub_title: 'lista',
					condutores: dados,
				});
			} else if (response.statusCode === 204) {
				res.render('condutores', {
					title: 'Condutores',
					sub_title: 'lista',
					condutores: {},
					mensagem: "204 - Não foram encontrados condutores na base de dados",
				});

			} else if (response.statusCode === 400) {
				return res.redirect(`/viaturas?err=val`);
			} else {
				return next(err);
			}
		}
	);

});


//  para uploads
const storage = multer.diskStorage({
	limits: { fileSize: 104800 },
	destination: function (req, file, next) {
		next(null, './app_server/upload/fotos/condutores');
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


appc.post('/', upload.single('inpFileImg'), async (req, res, next) => {
	const prefixo_unico = await req.body.nif;
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
		nome: String(req.body.nome).toUpperCase(),
		nif: parseInt(req.body.nif),
		tel: req.body.tel,
		email: req.body.email,
		entrada: req.body.entrada,
		kms: 0,
		estado: true,
		foto: nome_bd
	};
	// console.log('app post_data', post_data)

	let rota_api = '/api/condutores';
	let req_opts = {
		url: `${server_opts.server}${rota_api}`,
		method: 'POST',
		json: post_data
	};

	if (!post_data.nome || !post_data.nif) {
		res.redirect(`/condutores?err=val`)
	} else {
		try {
			request(
				req_opts,
				(err, response, body) => {
					if (response.statusCode === 201) {
						return res.redirect(`${server_opts.server}/condutores/${response.body._id}`);
					} else if (response.statusCode === 400) {
						res.redirect(`/condutores?err=val`);
					} else {
						next(err);
					}
				}
			);
		}catch(error){
			_showError(req, res, error.statusCode);
		}
	}
});


appc.get('/:idc', (req, res, next) => {
	const rota = `/api/condutores/${req.params.idc}`;
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
				res.render('condutor', {
					title: 'Condutor',
					sub_title: 'ficha',
					condutor: dados,
					rota: '/Condutor/id',
				});
				return res.end;
			} else if (response.statusCode === 400) {
				res.redirect(`/condutores?err=val`);
			} else {
				next(err);
			}
		}
	);
});


appc.post('/:idc', upload.single('inpFileImg'), async (req, res, next) => {

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
		post_data.nome = String(req.body.nome).toUpperCase();
		post_data.nif = parseInt(req.body.nif);
		post_data.tel = req.body.tel;
		post_data.email = req.body.email;
		post_data.entrada = req.body.entrada;
		post_data.ativo = req.body.chkAtivo === 'on' ? true : false;
	}

	const rota_api = `/api/condutores/${req.params.idc}`;
	const req_opts = {
		url: `${server_opts.server}${rota_api}`,
		method: 'POST',
		json: post_data
	};

	if (!post_data.foto && !post_data.nif) {
		res.redirect(`/condutores?err=val`)
	} else {
		request(
			req_opts,
			(err, response, body) => {
				if (response.statusCode === 200) {
					return res.redirect(`${server_opts.server}/condutores/${response.body._id}`);
				} else if (response.statusCode === 400) {
					res.redirect(`/condutores?err=val`);
				} else {
					next(err);
				}
			}
		);
	}
});



const _showError = function (req, res, status) {
	let title = '';
	let sub_title = '';
	let content = '';
	if (status === 404) {
		title = status,
			sub_tutle = 'página não encontrada';
		content = 'a página não se encontra no servidor';
	} else {
		title = status;
		sub_title = 'erro interno';
		content = res.stack;
	}
	res.status(status);
	res.render('error', {
		title: title,
		sub_title: sub_title,
		mensagem: content,
	});
};



module.exports = appc;