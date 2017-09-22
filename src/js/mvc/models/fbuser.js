module.exports = Backbone.Model.extend({

    initialize: function(attributes, options) {
      options || (options = {});
      this.options = _.defaults(options, this.defaultOptions);

      _.bindAll(this, 'onLoginStatusChange');

      this.on('FBloaded', function() {
        console.log("FB LOADED!!!");
        FB.Event.subscribe('auth.authResponseChange', this.onLoginStatusChange);
      });

    },

    options: null,

    defaultOptions: {
      // see https://developers.facebook.com/docs/authentication/permissions/
      scope: [], // fb permissions
      autoFetch: true, // auto fetch profile after login
      protocol: location.protocol
    },

    _loginStatus: null,

    isConnected: function() {
      return this._loginStatus === 'connected';
    },
/*
    login: function(callback){
      if (typeof callback === 'undefined') {
        callback = function() {};
      }
      FB.login(callback, { scope: this.options.scope.join(',') });
    },
*/
	login: function(){
		FB.login(function(response){
			console.log("LOGIN RESPONSE " + JSON.stringify(response));
		}, { scope: 'email'});
	},

    logout: function(){
      FB.logout();
    },

    updateLoginStatus: function(){
      FB.getLoginStatus(this.onLoginStatusChange);
    },

    onLoginStatusChange: function(response) {
      if(this._loginStatus === response.status) return false;

      var event;

      if(response.status === 'not_authorized') {
        event = 'facebook:unauthorized';
      } else if (response.status === 'connected') {
        event = 'facebook:connected';
        if(this.options.autoFetch === true) this.fetch();
      } else {
        event = 'facebook:disconnected';
      }

      this._loginStatus = response.status;
      this.trigger(event, this, response);
    },

    parse: function(response) {
      var attributes = _.extend(response, {
        pictures: this.profilePictureUrls(response.id)
      });

      return attributes;
    },

    sync: function(method, model, options) {
      if(method !== 'read') throw new Error('FacebookUser is a readonly model, cannot perform ' + method);

      var callback = function(response) {
        if(response.error) {
          options.error(response);
        } else {

          var pictures = response.pictures;

          if (pictures) App.User.set('picture', pictures.normal);

      App.User.set('name', response.name);
      App.User.set('facebook', response.id);

          options.success(response);
          console.log(response);
        }
        return true;
      };

      var request = FB.api('/me', callback);
      model.trigger('request', model, request, options);
      console.log("SYNCED A FB USER HERE BE RESPONSE");
      return request;
    },

    profilePictureUrls: function(id) {
      id || (id = this.id);
      var urls = {};
      _([ 'square', 'small', 'normal', 'large' ]).each(function(size){
        urls[size] = this.profilePictureUrl(id, size);
      }, this);

      return urls;
    },

    profilePictureUrl: function(id, size) {
      return [
        this.options.protocol,
        '//graph.facebook.com/',
        id,
        '/picture?type=',
        size,
        this.options.protocol.indexOf('https') > -1 ? '&return_ssl_resources=1' : ''
      ].join('');
    }

  });