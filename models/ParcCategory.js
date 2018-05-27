var keystone = require('keystone');

/**
 * ParcCategory Model
 * ==================
 */

var ParcCategory = new keystone.List('ParcCategory', {
	autokey: { from: 'name', path: 'key', unique: true },
});

ParcCategory.add({
	name: { type: String, required: true },
});

ParcCategory.relationship({ ref: 'Parc', path: 'parcs', refPath: 'categories' });

ParcCategory.register();
