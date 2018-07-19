var keystone = require('keystone');

/**
 * ParcCategory Model
 * ==================
 */

var CategoriaServico = new keystone.List('CategoriaServico', {
	autokey: { from: 'name', path: 'key', unique: true },
});

CategoriaServico.add({
	name: { type: String, required: true },
});

CategoriaServico.relationship({ ref: 'Servico', path: 'servicos', refPath: 'categories' });

CategoriaServico.register();
