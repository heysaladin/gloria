define([
	// Defaults
	"jquery",
	"underscore",
	"default_actions"
], function($, _, defActions){
	"use strict";

	// Applications
	// ------------------------------------------------------------------------

	var App = {
		defaultActions: defActions,

		// Initialize
		// ------------------------------------------------------------------------

		initialize: function() {

			// Initialize default actions
			// ------------------------------------------------------------------------

			defActions.initialize(this);
		}
	};

	return App;
});