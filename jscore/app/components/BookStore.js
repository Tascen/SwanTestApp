Ext.define('Swan.components.BookStore', {
	extend: 'Ext.data.Store',
	model: 'Swan.components.Book',
	proxy: {
		type: 'ajax',
		url : 'index.php/Book/loadList',
		success: function(r) { alert(r); },
		reader: {
			successProperty: 'success',
			type:'json',
		},
	},
	autoLoad: true
});
