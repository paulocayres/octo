var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Gallery Model
 * =============
 */

var Portfolio = new keystone.List('Portfolio', {
	autokey: { from: 'name', path: 'key', unique: true },
});

Portfolio.add({
	name: { type: String, required: true, label: 'Descrição' },
	heroImage: { type: Types.CloudinaryImage, label: 'Imagem Principal' },
	images: { type: Types.CloudinaryImages, label: 'Galeria' },
});

Portfolio.register();
