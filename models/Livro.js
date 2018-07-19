var keystone = require('keystone');
var Types = keystone.Field.Types;


 
/**
 * Livro Model
 * =============
 */


var Livro = new keystone.List('livro',{
	autokey: { from: 'codigo', path: 'slug', unique: true },
	//label: 'Livros',
	searchFields: 'codigo',
	});

Livro.add({
	codigo: {type: Types.Text, required: true, initial: true, default: ''},
	publicado: { type: Types.Date },
	conteudo: {
		resumo: { type: Types.Text },
		descricao: { type: Types.Text }
	}
});


Livro.defaultSort = '-codigo';
Livro.defaultColumns = 'codigo, pubicado, conteudo.resumo';
Livro.relationship({ ref: 'cliente', path: 'clientes', refPath: 'livro' });
Livro.register();
