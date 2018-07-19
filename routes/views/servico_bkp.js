var keystone = require('keystone');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Set locals
	locals.section = 'servico';
	locals.filters = {
		servico: req.params.servico,
	};
	locals.data = {
		servicos: [],
	};

	// Load the current parc
	view.on('init', function (next) {

		var q = keystone.list('Servico').model.findOne({
			slug: locals.filters.servico,
		}).populate('author categories');

		q.exec(function (err, result) {
			locals.data.servico = result;
			next(err);
		});

	});

	// Load other parcs
	view.on('init', function (next) {

		var q = keystone.list('Servico').model.find().populate('author').limit('4');

		q.exec(function (err, results) {
			locals.data.servicos = results;
			next(err);
		});

	});

	// Render the view
	view.render('servicoDetalhe');
};
