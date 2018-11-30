var keystone = require('keystone');
var async = require('async');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'home';

	// Load the galleries by sortOrder
	view.query('portfolios', keystone.list('Portfolio').model.find().sort('sortOrder'));

	// Load the Serviços by sortOrder
	locals.filters = {
		categoria: req.params.categoria,
	};
	locals.data = {
		servicos: [],
		categorias: [],
	};

	// Load all categories
	view.on('init', function (next) {

		keystone.list('CategoriaServico').model.find().sort('name').exec(function (err, results) {

			if (err || !results.length) {
				return next(err);
			}

			locals.data.categorias = results;

			// Load the counts for each category
			async.each(locals.data.categorias, function (categoria, next) {

				keystone.list('Servico').model.count().where('categories').in([categoria.id]).exec(function (err, count) {
					categoria.servicoCount = count;
					next(err);
				});

			}, function (err) {
				next(err);
			});
		});
	});

	// Load the current category filter
	view.on('init', function (next) {

		if (req.params.categoria) {
			keystone.list('CategoriaServico').model.findOne({ key: locals.filters.categoria }).exec(function (err, result) {
				locals.data.categoria = result;
				next(err);
			});
		} else {
			next();
		}
	});

	// Load the parcs
	view.on('init', function (next) {

		var q = keystone.list('Servico').paginate({
			page: req.query.page || 1,
			perPage: 10,
			maxPages: 10,
		})
			.populate('author categories');

		if (locals.data.categoria) {
			q.where('categories').in([locals.data.categoria]);
		}

		q.exec(function (err, results) {
			locals.data.servicos = results;
			next(err);
		});
	});



	// Render the view
	view.render('index');
};
