var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Parc Model
 * ==========
 */

var Servico = new keystone.List('Servico', {
	map: { name: 'title' },
	autokey: { path: 'slug', from: 'title', unique: true },
});

Servico.add({
	title: { type: String, required: true, label: 'Título' },
	author: { type: Types.Relationship, ref: 'Usuario', index: true, label: 'Autor' },
	image: { type: Types.CloudinaryImage, label: 'Imagem' },
	content: {
		brief: { type: Types.Html, wysiwyg: true, height: 150, label: 'Resumo' },
		extended: { type: Types.Html, wysiwyg: true, height: 400, label: 'Descrição' },
	},
	categories: { type: Types.Relationship, ref: 'CategoriaServico', many: true, label: 'Categoria' },
});

Servico.schema.virtual('content.full').get(function () {
	return this.content.extended || this.content.brief;
});

Servico.defaultColumns = 'title, state|20%, author|20%, publishedDate|20%';
Servico.register();
