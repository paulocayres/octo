/**
 * This file contains the common middleware used by your routes.
 *
 * Extend or replace these functions as your application requires.
 *
 * This structure is not enforced, and just a starting point. If
 * you have more middleware you may want to group it as separate
 * modules in your project's /lib directory.
 */
var _ = require('lodash');


/**
	Initialises the standard view locals

	The included layout depends on the navLinks array to generate
	the navigation in the header, you may wish to change this array
	or replace it with your own templates / logic.
*/
exports.initLocals = function (req, res, next) {
	res.locals.navLinks = [
		{ label: 'Home', key: 'home', href: '/' },
<<<<<<< HEAD
		{ label: 'Serviços', key: 'servico', href: '/servico' },
		{ label: 'Portfólio', key: 'portfolio', href: '/portfolio'},
		{ label: 'Quem Somos', key: 'quemsomos', href: '/quemsomos'},	
		{ label: 'Contato', key: 'contato', href: '/contato' },
=======
		{ label: 'Eventos', key: 'blog', href: '/blog' },
		{ label: 'Serviços', key: 'parcblog', href: '/parcblog' },
		{ label: 'Galeria', key: 'gallery', href: '/gallery'},	
		{ label: 'Clientes', key: 'cli', href: '/cliente'},
		{ label: 'Contato', key: 'contact', href: '/contact' },

>>>>>>> c2611674ee5300532a548c9585ca888cfb777c2d
	];
	res.locals.user = req.user;
	next();
	

};


/**
	Fetches and clears the flashMessages before a view is rendered
*/
exports.flashMessages = function (req, res, next) {
	var flashMessages = {
		info: req.flash('info'),
		success: req.flash('success'),
		warning: req.flash('warning'),
		error: req.flash('error'),
	};
	res.locals.messages = _.some(flashMessages, function (msgs) { return msgs.length; }) ? flashMessages : false;
	next();
};


/**
	Prevents people from accessing protected pages when they're not signed in
 */
exports.requireUser = function (req, res, next) {
	if (!req.user) {
		req.flash('error', 'Favor autenticar seu usuário para cessar esta página.');
		res.redirect('/keystone/signin');
	} else {
		next();
	}
};
