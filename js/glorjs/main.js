require.config({
	waitSeconds: 200,
	paths: {
		"jquery": "jquery-1.9.0.min",
		"underscore": "underscore-AMD-1.4.4",
		"backbone": "backbone-AMD-1.0.0",

		// Defaults
		"plugins": 				"plugins",
		"default_actions": 		"defaultActions"
	},
	shim: {
		"plugins": 				{ deps: ["jquery"] },
		"default_actions": 		{ deps: ["jquery"] }
	}
});

require(["app", "plugins"], function(MainApp) {
	MainApp.initialize();
});