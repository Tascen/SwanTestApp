
Ext.define('Swan.components.formController', {
	extend: 'Ext.app.Controller',
	alias: 'wdiget.edit',

	views: ['Swan.components.formView'],
	models: ['Swan.components.Book'],

	view: undefined,
	values: undefined,

	show: function(param = {}) {

		let Form = this.getView('Swan.components.formView');
		this.view = Ext.create(Form, {title: param.title});
		this.view.show();

		this.values = param.values;

		if (this.values) {
			this.getFormPanel().getForm().setValues(this.values);
		}

		this.view.on('close', this.onViewClose, this);

		this.getCancelButton().on('click', this.onCancelButtonClick, this);
		this.getSaveButton().on('click', this.onSaveButtonClick, this);
	},


	refs: [
		{
			ref: 'cancelButton',
			selector: 'button#cancelButton'
		},
		{
			ref: 'saveButton',
			selector: 'button#saveButton'
		},
		{
			ref: 'formPanel',
			selector: '#formPanel'
		}
	],


	onCancelButtonClick: function () {
		this.cancel();
	},

	onSaveButtonClick: function () {
		this.save();
	},

	cancel: function () {
		this.view.close();
	},

	save: function () {
		let formPanel = this.getFormPanel();

		if (!formPanel.isValid()) {
			Ext.MessageBox.alert('Error', 'Исправте ошибки, форма не валидна');
			return;
		}

		let values = formPanel.getValues();
		if (this.values) {
			this.application.fireEvent('FORM_CONTROLLER_EDIT', {...values, book_id: this.values.book_id});
		}
		else {
			this.application.fireEvent('FORM_CONTROLLER_ADD', values);
		}


		this.cancel();
	},

	onViewClose: function () {
		this.application.fireEvent('FORM_CONTROLLER_VIEW_CLOSED');
	}
});
