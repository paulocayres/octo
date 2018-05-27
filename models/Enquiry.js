var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Enquiry Model
 * =============
 */

var Enquiry = new keystone.List('Enquiry', {
	nocreate: true,
	noedit: true,
});

Enquiry.add({
	name: { type: Types.Name, required: true },
	email: { type: Types.Email, required: true },
	phone: { type: String },
	enquiryType: { type: Types.Select, options: [
		{ value: 'message', label: 'Apenas deixar mensagem.' },
		{ value: 'question', label: 'Tenho uma pergunta.' },
		{ value: 'other', label: 'Outros assuntos.' },
	] },
	message: { type: Types.Markdown, required: true },
	createdAt: { type: Date, default: Date.now },
});

Enquiry.defaultSort = '-createdAt';
Enquiry.defaultColumns = 'name, email, enquiryType, createdAt';
Enquiry.register();
