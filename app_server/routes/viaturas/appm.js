const express = require('express');
const appm = express.Router();

const request = require('request');

const server_opts = { server: 'http://localhost:3000' }

if (process.env.NODE_ENV === 'production') {
	server_opts.server = 'http://nameless-river-78172.herokuapp.com'
};

appm.get('/', (req, res, next) => {

	const rota = '/api/manutencoes';
	const req_opts = {
		url: `${server_opts.server}${rota}`,
		method: 'GET',
		json: {}
	};

	request(
		req_opts,
		(err, response, body) => {
			const dados = body;

			console.log(response.json)
			
			if (response.statusCode === 200) {
				res.render('manutencoes', {
					title: 'Manutenções',
					sub_title: 'lista',
					manutencoes: dados,
				});
			} else if (response.statusCode === 204) {
				res.render('manutencoes', {
					title: 'Manutenções',
					sub_title: 'lista',
					manutencoes: {},
				});
			} else if (response.statusCode === 400) {
				return res.redirect(`/manutencoes?err=val`);
			} else {
				return next(err);
			}
		}
	);
});

module.exports = appm;