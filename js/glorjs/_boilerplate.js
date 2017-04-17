define([
	"jquery", 
	"underscore",
	"backbone",
	"app"
], function($, _, Backbone, MainApp){
	"use strict";

	var appRoute = undefined;

	// Applications
	// ------------------------------------------------------------------------
	
	var App = {
		initialize: function() {
			
		}
	};

	// Backbone Router
	// ------------------------------------------------------------------------
	
	var AppRouter = Backbone.Router.extend({
		routes: {
			// URL with hashbang fragment
			//"!/fragment": "fragmentActions"

			"": "defaultActions"
		},

		defaultActions: function() {
			
		}
	});

	// Initialize
	// ------------------------------------------------------------------------
	
	var initialize = function() {
		appRoute = new AppRouter;

		App.initialize();
		
		// Start Backbone history
		// ------------------------------------------------------------------------
	
		Backbone.history.start();
	};

	return { initialize: initialize };

});