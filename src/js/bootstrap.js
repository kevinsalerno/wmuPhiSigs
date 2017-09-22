  Backbone    =     require('backbone')
, Backbone.$  = $ = jQuery = require('jquery')
, _           =     require('underscore')
, Marionette  =     require('backbone.marionette')
, cssify = require('cssify')
, Handlebars = require('handlebars')
, Backbone.Courier = require('./plugins/backbone.courier.min');

//, Marionette.Modals = require('./plugins/backbone.modal-bundled-min');

//style = require('../css/style.css');

require('./plugins/backbone.modal-bundled');

cssify.byUrl('//maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css');
cssify.byUrl('//maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css');
//cssify.byUrl('//cdnjs.cloudflare.com/ajax/libs/bootstrap-social/4.12.0/bootstrap-social.min.css');

//fonts.googleapis.com/css?family=Montserrat:400,700" rel="stylesheet" type="text/css">
cssify.byUrl('//fonts.googleapis.com/css?family=Kaushan+Script');
cssify.byUrl('//fonts.googleapis.com/css?family=Droid+Serif:400,700,400italic,700italic');
cssify.byUrl('//fonts.googleapis.com/css?family=Roboto+Slab:400,100,300,700');
    
cssify.byUrl('//cdnjs.cloudflare.com/ajax/libs/bootstrap-social/4.12.0/bootstrap-social.min.css');
cssify.byUrl('//cdnjs.cloudflare.com/ajax/libs/backbone.modal/1.1.5/backbone.modal-min.css');
cssify.byUrl('//cdnjs.cloudflare.com/ajax/libs/backbone.modal/1.1.5/backbone.modal.theme-min.css');
//agency = require('../css/agency.css');
//easing = require('./plugins/agency/jquery.easing.1.3');
//classie = require('./plugins/agency/classie');
//cbpAnimatedHeader = require('./plugins/agency/cbpAnimatedHeader.min');
//agencyjs = require('./plugins/agency/agency');