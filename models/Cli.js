var keystone = require('keystone');
var Types = keystone.Field.Types;


 
/**
 * Cliente Model
 * =============
 */


var Cli = new keystone.List('cliente',{
	autokey: { from: 'CPF', path: 'slug', unique: true },
	label: 'Clientes',
	searchFields: 'CPF',
	});

Cli.add({
	nome: { type: Types.Name },
	CPF: {type: Types.Text, required: true, initial: true, defaul: ''},
	email: { type: Types.Email},
	telefone: { type: Types.Text},
	nascimento: { type: Types.Date },
	livro: { type: Types.Relationship, ref: 'livro', many: true }
});


Cli.defaultSort = '-nascimento';
Cli.defaultColumns = 'nome, CPF, email, telefone, nascimento';
Cli.register();
