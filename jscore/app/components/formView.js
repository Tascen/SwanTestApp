 Ext.define('Swan.components.formView', {
  extend: 'Ext.window.Window',

  constructor: function(config = {}) {
    this.callParent(arguments)
    this.title = config.title || 'Edit';
  },

  id: 'confirmWindow',
  border: 0,
  height: 270,
  width:480,
  resizable: false,
  modal: true,
  closable: false,
  title: this.title,

  layout: 'fit',
  items: [
    {
      xtype: 'form',
      layout: 'column',
      itemId: 'formPanel',
      defaults: {
        columnWidth: 1,
        allowBlank: false,
        style: {
          marginBottom: '5px'
        }
      },
      bodyStyle: {
        padding: '5px'
      },
      items: [
        {
          xtype: 'textfield',
          fieldLabel: 'Автор',
          itemId: 'author_name',
          name: 'author_name'
        },
        {
          xtype: 'textfield',
          fieldLabel: 'Название',
          itemId: 'book_name',
          name: 'book_name'
        },
        {
          xtype: 'textfield',
          fieldLabel: 'Год выпуска',
          itemId: 'book_year',
          name: 'book_year'
        }
      ]
    }
  ],

  buttons: [{
    text: 'Подтвердить',
    itemId: 'saveButton',
    handler: function() {}
  }, {
    text: 'Отмена',
    itemId: 'cancelButton',
    handler: function() {}
  }]


});
