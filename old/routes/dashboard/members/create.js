var express = require('express');
var router = express.Router();

var queries                     = require('../../queries');
var methods                     = require('../../methods');


router.get('/dashboard/members/create',
    function(req, res){
        methods.addLocals('Create Member', res, req);
        //methods.checkLogin('dashboard/members/create', res, req);
        res.render('dashboard/members/create');
    });

router.post('/dashboard/members/create',
    function(req, res){
        if (/*req.session && req.session.userid*/ 1==1){
            methods.addLocals('Create Member', res, req);

            if (req.body.firstname && req.body.lastname && req.body.email && req.body.username){

            var userinfo = [];

            userinfo.firstname = req.body.firstname;
            userinfo.lastname = req.body.lastname;
            userinfo.email = req.body.email;
            userinfo.username = req.body.username;

            if (req.body.pin){
                userinfo.pin = req.body.pin;
            }

            if (req.body.ssn){
                userinfo.ssn = req.body.ssn;
            }

            if (req.body.address1){
                userinfo.address1 = req.body.address1;
            }

            if (req.body.address2){
                userinfo.address2 = req.body.address2;
            }

            if (req.body.city){
                userinfo.city = req.body.city;
            }

            if (req.body.state){
                userinfo.state = req.body.state;
            }         
               
            if (req.body.zip){
                userinfo.zip = req.body.zip;
            }

            if (req.body.status){
                userinfo.status = req.body.status;
            }

            if (req.body.eboard){
                userinfo.eboard = req.body.eboard;
            }

            if (req.body.chair){
                userinfo.chair = req.body.chair;
            }

            if (req.body.family){
                userinfo.family = req.body.family;
            }
            
            queries.createUser(userinfo, function(cb){
            //res.json(cb);

            //var sqlResult = cb.Result;
            //var success = sqlResult[0][0].SUCCESS;
            //console.log("Success is: " + success);
            /*
            if (success > 0){
                res.locals.statuscode = 'success';
                res.locals.statusmessage = 'User created successfully!';
            } else {
                res.locals.statuscode = 'danger';
                res.locals.statusmessage = 'User creation failed!';
            }
            */
            //res.locals.statuscode = 'success';
            //res.locals.statusmessage = 'User created successfully!';
            //req.body = null;
            res.locals.statuscode = 'success';
            res.locals.statusmessage = 'Memeber created successfully!';
            res.redirect('/dashboard/members');
        });
        }
         else {
            // minimum requirements not met
        }
    }        //res.redirect('/dashboard/members');
         else {
            res.redirect('/');
        }
    
    });


module.exports = router;