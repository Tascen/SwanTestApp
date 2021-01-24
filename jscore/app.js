Ext.onReady(function() {
	Ext.application({
	  appFolder: './jscore/app',
	  autoCreateViewport: true,
		name: 'Swan',
		paths: {
			"Swan": './jscore/app'
		},


		requires: ['Swan.components.controller'],
	  launch: function() {
	    let controller = this.getController( 'Swan.components.controller' );
	  }

	});
});
