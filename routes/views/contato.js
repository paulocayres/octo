var keystone = require('keystone');
var Contato = keystone.list('Contato');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Set locals
	locals.section = 'contato';
	locals.contatoTypes = Contato.fields.contatoType.ops;
	locals.formData = req.body || {};
	locals.validationErrors = {};
	locals.contatoSubmitted = false;

	// On POST requests, add the Enquiry item to the database
	view.on('post', { action: 'contato' }, function (next) {

		var newContato = new Contato.model();
		var updater = newContato.getUpdateHandler(req);

		updater.process(req.body, {
			flashErrors: true,
			fields: 'name, email, phone, contatoType, message',
			errorMessage: 'Houve um problema para processar seu contato:',
		}, function (err) {
			if (err) {
				locals.validationErrors = err.errors;
			} else {
				locals.contatoSubmitted = true;
			}
			next();
		});
	});

	view.render('contato');
};
