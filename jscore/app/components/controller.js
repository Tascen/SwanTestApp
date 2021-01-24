Ext.define( 'Swan.components.controller' , {
	extend: 'Ext.app.Controller' ,

	stores: ['Swan.components.BookStore'],
	views: ['Swan.components.view'],
	requires: ['Swan.components.formController'],

	refs: [
		{
			ref: 'editButton' ,
			selector: 'button#editButton'
		},
		{
			ref: 'addButton' ,
			selector: 'button#addButton'
		},
		{
			ref: 'deletButton' ,
			selector: 'button#deletButton'
		},
		{
			ref: 'exportButton' ,
			selector: 'button#exportButton'
		},
	],

	grid: undefined,

	init: function () {
		let store = this.getStore( 'Swan.components.BookStore' ),
			Grid = this.getView( 'Swan.components.view' );
		this.grid = Ext.create(Grid);
		this.addComponent(this.grid);

		this.getAddButton().on( 'click' ,this.add, this );
		this.getEditButton().on( 'click' ,this.edit, this );
		this.getDeletButton().on( 'click' ,this.delet, this );
		this.getExportButton().on( 'click' ,this.export_list, this );
	},


	add: function (button) {
		let controller = this.application.getController('Swan.components.formController');
		controller.show({title: "Добавить"});

		this.application.on('FORM_CONTROLLER_ADD', this.onFormControllerAdd, this);
		this.application.on('FORM_CONTROLLER_CLOSED', this.onFormControllerClosed, this);
	},
	edit: function (button) {
		let controller = this.application.getController('Swan.components.formController'), selectedRecord = this.getSelectedRecord();
		if (selectedRecord != -1) {
			controller.show({values: selectedRecord.getData(), title: "Редактировать"});
		} else {
			Ext.MessageBox.alert('Error', 'Выберите книгу');
		}
		this.application.on('FORM_CONTROLLER_EDIT', this.onFormControllerEdit, this);
		this.application.on('FORM_CONTROLLER_CLOSED', this.onFormControllerClosed, this);
	},
	delet: function () {
		let selectedRecord = this.getSelectedRecord();
		if (selectedRecord != -1) {
			delet_book(this.getSelectedRecord().data.book_id)
				.then(data=>{
					this.getSelectedRecord().store.filterBy((item)=>item.data.book_id!=data.book_id)
				})

		} else {
			Ext.MessageBox.alert('Error', 'Выберите книгу');
		}
	},
	export_list: function () {



		export_list()
			.then(data=>{
				Ext.MessageBox.confirm('Формат XML', "Скопировать в буфер?", function(value){
					if (value == "yes") {
						copy_text(data)
					}
				});
			})
	},



	getSelectedRecord: function () {
		if (this.grid.getSelectionModel().getSelection().length != 0) {
			return this.grid.getSelectionModel().getSelection()[0];
		} else {
			return -1;
		}
	},



	onFormControllerAdd: function (values) {
		insert_book(values) // need: book_name, author_name, book_year
			.then(data=>{
				this.grid.store.add(data);
			})
			.catch(error=>{
				Ext.MessageBox.alert('Error', 'Ошибка: ' + error);
			})
	},

	onFormControllerEdit: function (values) {
		update_book(values) // need: book_id, book_name, author_name, book_year
			.then(data=>{
				let selectedRecord = this.getSelectedRecord();
				Ext.Object.each(data, function (key, value) {
					selectedRecord.set(key, value);
				}, this);
			})
			.catch(error=>{
				Ext.MessageBox.alert('Error', 'Ошибка: ' + error);
			})
	},

	onFormControllerClosed: function () {
		this.application.un('FORM_CONTROLLER_ADD', this.onFormControllerAdd, this);
		this.application.un('FORM_CONTROLLER_EDIT', this.onFormControllerEdit, this);
		this.application.un('FORM_CONTROLLER_CLOSED', this.onFormControllerClosed, this);
	},



	addComponent : function (component) {
		let viewport = Ext.ComponentQuery.query( 'component_viewport' )[0];
		viewport.add(component);
	}
});






//requests functions
function insert_book(data) {
	let head_resolve, head_reject;

	fetch("index.php/Book/insertBook", {
		method: "POST",
		headers: {'Content-Type': 'application/json'},
		body: JSON.stringify(data)
	})
		.then(response=>response.json())
	  .then(data => {head_resolve(data);})
		.catch(error=>{head_reject(error);});


	return new Promise((resolve, reject)=>{
		head_resolve = resolve;
		head_reject = reject;
	})
}

function update_book(data) {
	let head_resolve, head_reject;

	fetch("index.php/Book/updateBook", {
		method: "POST",
		headers: {'Content-Type': 'application/json'},
		body: JSON.stringify(data)
	})
		.then(response=>response.json())
	  .then(data => {head_resolve(data);})
		.catch(error=>{head_reject(error);});


	return new Promise((resolve, reject)=>{
		head_resolve = resolve;
		head_reject = reject;
	})
}

function delet_book(id) {
	let head_resolve, head_reject;

	fetch("index.php/Book/deleteBook", {
		method: "POST",
		headers: {'Content-Type': 'application/json'},
		body: JSON.stringify({book_id: id})
	})
		.then(response=>response.json())
	  .then(data => {head_resolve(data);})
		.catch(error=>{head_reject(error);});


	return new Promise((resolve, reject)=>{
		head_resolve = resolve;
		head_reject = reject;
	})
}

function export_list() {
	let head_resolve, head_reject;

	fetch("index.php/Book/exportList", {
		//headers: {'Content-Type': 'application/json'},
	})
		.then(response=>response.text())
	  .then(data => {head_resolve(data);})
		.catch(error=>{head_reject(error);});


	return new Promise((resolve, reject)=>{
		head_resolve = resolve;
		head_reject = reject;
	})
}






//Other
function copy_text(text) {
  if (!navigator.clipboard) {
    fallback__copy_text(text);
    return;
  }
  navigator.clipboard.writeText(text).then(function() {
    console.log('Async: Copying to clipboard was successful!');
  }, function(err) {
    console.error('Async: Could not copy text: ', err);
  });
}
function fallback__copy_text(text) {
  var textArea = document.createElement("textarea");
  textArea.value = text;

  // Avoid scrolling to bottom
  textArea.style.top = "0";
  textArea.style.left = "0";
  textArea.style.position = "fixed";

  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    var successful = document.execCommand('copy');
    var msg = successful ? 'successful' : 'unsuccessful';
    console.log('Fallback: Copying text command was ' + msg);
  } catch (err) {
    console.error('Fallback: Oops, unable to copy', err);
  }

  document.body.removeChild(textArea);
}
