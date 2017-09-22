// route middleware to make sure a user is logged in
module.exports = function (passport){

	return function (req, res, next) {
		//if (req.isAuthenticated() && req.session.fb && req.session.fb.token === req.query.access_token && req.session.fb.id === req.query.profile_id){
			if (req.isAuthenticated() && req.session.fb){
			//maybe add a check for req.session.fb.id === req.query.profile_id
			next();
		} else {
			console.log("token not same, reauth. sesh fb: " + JSON.stringify(req.session.fb) + " req.query " + JSON.stringify(req.query));
			passport.authenticate('facebook-token', function(err, user, info) {
    		if (user){
    			req.login(user, function(err) {
      			if (err) { return next(err); }
        			return next();
        		});
    		} else {
    			console.log("THERE WAS AN ERROR");
    			console.log(err);
    			return res.status(401).send(err);
    		}})(req, res, next);
    	}
	};
};