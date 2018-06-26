var keystone = require('keystone');
var async = require('async');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Init locals
	locals.section = 'cli';
	locals.data = {
		clientes: [],
	};


	// Load the posts
	view.on('init', function (next) {

		var q = keystone.list('cliente').paginate({
			page: req.query.page || 1,
			perPage: 10,
			maxPages: 10,
		})
			.sort('-nascimento');


		q.exec(function (err, results) {
			locals.data.clientes = results;
			next(err);
		});
	});

	// Render the view
	view.render('cliente');
};
