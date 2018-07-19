var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Y Model
 * ==========
 */
var Usuario = new keystone.List('Usuario');

Usuario.add({
	name: { type: Types.Name, required: true, index: true, label: 'Nome' },
	email: { type: Types.Email, initial: true, required: true, unique: true, index: true },
	password: { type: Types.Password, initial: true, required: true },
}, 'Permissions', {
	isAdmin: { type: Boolean, label: 'Can access Keystone', index: true, label: 'Administrador?' },
});

// Provide access to Keystone
Usuario.schema.virtual('canAccessKeystone').get(function () {
	return this.isAdmin;
});


/**
 * Relationships
 */
Usuario.relationship({ ref: 'Servico', path: 'servicos', refPath: 'author' });


/**
 * Registration
 */
Usuario.defaultColumns = 'name, email, isAdmin';
Usuario.register();
