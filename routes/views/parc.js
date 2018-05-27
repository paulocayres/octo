var keystone = require('keystone');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Set locals
	locals.section = 'parc';
	locals.filters = {
		parc: req.params.parc,
	};
	locals.data = {
		parcs: [],
	};

	// Load the current parc
	view.on('init', function (next) {

		var q = keystone.list('Parc').model.findOne({
			state: 'published',
			slug: locals.filters.parc,
		}).populate('author categories');

		q.exec(function (err, result) {
			locals.data.parc = result;
			next(err);
		});

	});

	// Load other parcs
	view.on('init', function (next) {

		var q = keystone.list('Parc').model.find().where('state', 'published').sort('-publishedDate').populate('author').limit('4');

		q.exec(function (err, results) {
			locals.data.parcs = results;
			next(err);
		});

	});

	// Render the view
	view.render('parc');
};
