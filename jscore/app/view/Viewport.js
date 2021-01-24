
Ext.define('Swan.view.Viewport', {
    extend: 'Ext.container.Viewport',
	alias: 'widget.component_viewport',

	renderTo: Ext.getBody(),
    layout: {
        type: 'vbox',
        align: 'stretch'
    }


});
