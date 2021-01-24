Ext.define('Swan.components.Book', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'id', type: 'int' },
        { name: 'author_name', type: 'string' },
        { name: 'book_name', type: 'string' },
        { name: 'book_year', type: 'int' }
    ]
});
