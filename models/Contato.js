var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Enquiry Model
 * =============
 */

var Contato = new keystone.List('Contato', {
	nocreate: true,
	noedit: true,
});

Contato.add({
	name: { type: Types.Name, required: true, label: 'Nome' },
	email: { type: Types.Email, required: true, label: 'Email' },
	phone: { type: String, label: 'Telefone' },
	enquiryType: { type: Types.Select, label: 'Tipo de Contato', options: [
		{ value: 'message', label: 'Apenas deixar mensagem.' },
		{ value: 'question', label: 'Tenho uma pergunta.' },
		{ value: 'other', label: 'Outros assuntos.' },
	] },
	message: { type: Types.Markdown, required: true, label: 'Mensagem' },
	createdAt: { type: Date, default: Date.now, label: 'Data' },
});

Contato.defaultSort = '-createdAt';
Contato.defaultColumns = 'name, email, enquiryType, createdAt';
Contato.register();
