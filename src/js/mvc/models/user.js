var App = window.App;

module.exports = Backbone.Model.extend({

  	idAttribute: '_id',

  	urlRoot: '/app/user/',

	initialize: function(options){
		this.listenTo(App.activeSession, 'facebook:connected', function(activeSession, response){
			console.log("FB WAS CONNECTED");
			console.log(activeSession);
			console.log(response);


			this.fetch({
				data: { access_token: response.authResponse.accessToken, profile_id: response.authResponse.userID },
				processData: true,
				success: function(model, response, options) {
					console.log("was successful! save returned token HERE? or parse");
				},
				error: function(model, response, options) {

				}
			});
		});
		this.listenTo(App.activeSession, 'facebook:disconnected', function(activeSession, response){
			this.clear();
		});
	},

	parse: function(response, options){
		console.log("PARSED USER");
		console.log(response);
		return response;
	}
});
