Ext.define('Swan.components.view' ,{
	extend: 'Ext.grid.Panel',
	alias: 'widget.grid',
	store: {
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
	},
	title: 'Книги',


	columns: [
		{
			dataIndex: 'author_name',
			text: 'Автор',
			width: 150
		},
		{
			dataIndex: 'book_name',
			text: 'Название книги',
			flex: 1
		},
		{
			dataIndex: 'book_year',
			text: 'Год издания',
			width: 150
		}
	],



	dockedItems: [{
		xtype: 'toolbar',
		dock: 'top',
		items: [
			{
				xtype: 'button',
				name: 'add',
				text: 'Добавить',
				itemId: 'addButton'
			},
			{
				xtype: 'button',
				name: 'edit',
				text: 'Редактировать',
				itemId: 'editButton'
			},
			{
				xtype: 'button',
				name: 'delet',
				text: 'Удалить',
				itemId: 'deletButton'
			},
			{
				xtype: 'button',
				name: 'export',
				text: 'Экспорт в XML',
				itemId: 'exportButton'
			},
		]
	}]


});
