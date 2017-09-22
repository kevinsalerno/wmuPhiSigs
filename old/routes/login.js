var express = require('express');
var router = express.Router();
var queries = require('./queries');
var pass = require('./password');

  router.all('/login',
    function(req, res){
        if (req.body.username && req.body.password){
            var username = req.body.username;
            var password = req.body.password;
            var salt;
            var secret;

            queries.getSalt(username, function(cb) { 
            var sqlResult = cb.Result; 
            console.log(sqlResult[0][0].Salt);
            if (sqlResult[0][0].Salt !== null){
                console.log("NO NULL");
                salt = sqlResult[0][0].Salt;
                secret = sqlResult[0][0].Secret;
            }
        });
            if(pass.checkPassword(username, password, salt, secret)){
            queries.manageLogin(username, secret, function(cb) { 
            //res.json(cb);

            var sqlResult = cb.Result;

            //login is good
            var userid = sqlResult[1][0].MemberId;


            var firstname = sqlResult[1][0].FirstName;
            var lastname = sqlResult[1][0].LastName;
            var email = sqlResult[1][0].Email;
            var username = user;

            req.session.userid = userid;
            req.session.username = username;
            req.session.firstname = firstname;
            req.session.lastname = lastname;
            req.session.email = email;
        });

        res.redirect('/dashboard');

        } else {
            //login incorrect
            res.redirect('/');
        }
            

            /*
            queries.manageLogin(req.body.username, req.body.password, salt, function(cb) { 
            //res.json(cb);

            var sqlResult = cb.Result;
            var success = sqlResult[0][0].SUCCESS;
            //console.log("Success is: " + success);

            if (success > 0){
            //login is good
            var userid = sqlResult[1][0].MemberId;


            var firstname = sqlResult[1][0].FirstName;
            var lastname = sqlResult[1][0].LastName;
            var email = sqlResult[1][0].Email;
            var username = req.body.username;

            req.session.userid = userid;
            req.session.username = username;
            req.session.firstname = firstname;
            req.session.lastname = lastname;
            req.session.email = email;
            */
        
    }
    else {
        res.send("no user or pw entered");
    }
    });

module.exports = router;

