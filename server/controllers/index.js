var express = require('express');

//module.exports = function(passport){
module.exports = function(passport){
	
	// declare router object, AKA 'app' from server.js
	var router = express.Router();

	//	*******************
	//	M I D D L E W A R E
	//	*******************
	//	Login checks for user/admin portals
	var loginCheck				= require('../middleware/loginCheck');



	//	*********************************
	//	R O U T E   D E F I N I T I O N S
	//	*********************************
	var home				= require('./home');
	var dashboard				= require('./dashboard');


	//	***********
	//	R O U T E S
	//	***********
    router.use('/', home);
    router.use('/dashboard', loginCheck, dashboard);

	return router;
};