var express                     = require('express');
var cookieparser                = require('cookie-parser');
var bodyParser                  = require('body-parser');
var session                     = require('cookie-session');
var logger                      = require('morgan');
var util                        = require('util');
var path                        = require('path');
var util                        = require('ejs');


 
var nodemailer = require('nodemailer');

var mysql                       = require('mysql');

var queries                     = require('./routes/queries');


var app = express();

var motd1 = '';
var motd2 = '';
var motd3 = '';

app.use(session({
    cookieName: 'session',
    secret: 'AF37ADD8EA23A',
    duration: 30 * 60 * 1000,
    activeDuration: 5 * 60 * 1000
}));
 
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs'); 

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));



var home = require('./routes/home');
var alumni = require('./routes/alumni');
var brothers = require('./routes/brothers');
var history = require('./routes/history');
var contact = require('./routes/contact');
var login = require('./routes/login');
var logout = require('./routes/logout');
var dashboard = require('./routes/dashboard');
var files = require('./routes/dashboard/files');
var members = require('./routes/dashboard/members');
var memberscreate = require('./routes/dashboard/members/create');

app.use(home);
app.use(alumni);
app.use(brothers);
app.use(contact);
app.use(login);
app.use(logout);
app.use(dashboard);
app.use(files);
app.use(members);
app.use(memberscreate);
    

app.all('/email',
        function(req, res){
            addLocals('Email', res, req);

            var transport = nodemailer.createTransport();

            
        var mailOptions = {
         from: "test@wmuPhiSigs.org",
         to: req.session.email,
         subject: "Phi Sig Test!!",
         text: "some test n jazz"
        };

        transport.sendMail(mailOptions, function(e) {
            if (e) { console.log(e); } 
            else{
            console.log('Success! Mail (from: ' + mailOptions.from 
                + ') sent (to: ' + mailOptions.to + ')'
            );
            }
        });


        });

app.listen('8080', '127.0.0.1', function () {
    console.log("Listening on port 127.0.0.1" + 8080);
});



/*  query 
    var params = {
        query_string : "CALL funt("+mysql.escape(var)+");"
    }
    databaseQuery(params, function(cb) {
        //cb is the returned info from db
    });
*/




/*
    function checkLogin(res, req){
    if (req.session && req.session.userid) {
        return true;
    }
        else {
            res.redirect("/");
        }
    }
*/

/*
    app.all('/dashboard',
    function(req, res){
        if (req.session && req.session.userid){
       // res.sendFile(path.join(__dirname + '/private/Lab3ksalern4336Dashboard.html'));
        res.render(path.join(__dirname + '/private/Lab3ksalern4336Dashboard.html'), {title: 'test'}

        );

        }
        else {
            res.send("Wut r u doing here? login first..");
        }
    });
*/


/*
app.all('/dashboard',
    function(req, res){
        addLocals('Dashboard', res, req);
        checkLogin('dashboard', res, req);
    });
*/
/*
app.all('/dashboard/members',
    function(req, res){
        if (req.session && req.session.userid){
            addLocals('Members', res, req);
            getMembers(function(cb) { 
            //res.json(cb);

            var sqlResult = cb.Result;
            var members = sqlResult[0];
            //res.json(members[0]);
            res.locals.members = members;
            res.render('members');
        });
    }

        //checkLogin('members', res, req);
    });

*/
