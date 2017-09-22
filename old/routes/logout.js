var express = require('express');
var router = express.Router();


router.all('/logout',
    function(req, res){
        if (req.session && req.session.userid) {
            //debugging
            req.session = null;

            res.locals.statuscode = 'success';
            res.locals.statusmessage = 'You have logged out successully!';
        }
        else {
            //login not detected
        }
        addLocals('Home', res, req);
        res.render('home');
    });


module.exports = router;