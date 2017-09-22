#!/bin/env node
//  OpenShift sample Node application
var express = require('express');
var fs      = require('fs');
var cookieparser                = require('cookie-parser');
var bodyParser                  = require('body-parser');
var logger                      = require('morgan');
var util                        = require('util');
var path                        = require('path');
var ejs                         = require('ejs');
var flash                       = require('connect-flash');

const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

var passport = require('passport');
var mongoose = require('mongoose');
var configDB = require('./config/database');

//var braintree = require("braintree");
//var configBraintree = require('./config/braintree');

mongoose.connect(configDB.url + configDB.database);

/*
var gateway = braintree.connect({
  environment: braintree.Environment.Sandbox,
  merchantId: configBraintree.merchantId,
  publicKey: configBraintree.publicKey,
  privateKey: configBraintree.privateKey
});
*/

/**
 *  Define the sample application.
 */


    /*  ================================================================  */
    /*  Helper functions.                                                 */
    /*  ================================================================  */

    /**
     *  Set up server IP address and port # using env variables/defaults.
     */
    setupVariables = function() {
        //  Set the environment variables we need.
        ipaddress = process.env.OPENSHIFT_NODEJS_IP ||
                         process.env.OPENSHIFT_INTERNAL_IP;
        port      = process.env.OPENSHIFT_NODEJS_PORT   ||
                         process.env.OPENSHIFT_INTERNAL_PORT || 8080;

        if (typeof ipaddress === "undefined") {
            //  Log errors on OpenShift but continue w/ 127.0.0.1 - this
            //  allows us to run/test the app locally.
            console.warn('No OPENSHIFT_*_IP var, using 127.0.0.1');
            ipaddress = "127.0.0.1";
        }
    };


    /**
     *  Populate the cache.
     */
    populateCache = function() {
        if (typeof zcache === "undefined") {
            zcache = { 'index.html': '' };
        }

        //  Local cache for static content.
        //self.zcache['index.html'] = fs.readFileSync('./index.html');
    };


    /**
     *  Retrieve entry (content) from cache.
     *  @param {string} key  Key identifying content to retrieve from cache.
     */
    cache_get = function(key) { return zcache[key]; };


    /**
     *  terminator === the termination handler
     *  Terminate server on receipt of the specified signal.
     *  @param {string} sig  Signal to terminate on.
     */
    terminator = function(sig){
        if (typeof sig === "string") {
           console.log('%s: Received %s - terminating sample app ...',
                       Date(Date.now()), sig);
           process.exit(1);
        }
        console.log('%s: Node server stopped.', Date(Date.now()) );
    };


    /**
     *  Setup termination handlers (for exit and a list of signals).
     */
    var setupTerminationHandlers = function(){
        //  Process on exit and signals.
        process.on('exit', function() { terminator(); });

        // Removed 'SIGPIPE' from the list - bugz 852598.
        ['SIGHUP', 'SIGINT', 'SIGQUIT', 'SIGILL', 'SIGTRAP', 'SIGABRT',
         'SIGBUS', 'SIGFPE', 'SIGUSR1', 'SIGSEGV', 'SIGUSR2', 'SIGTERM'
        ].forEach(function(element, index, array) {
            process.on(element, function() { terminator(element); });
        });
    };


    /*  ================================================================  */
    /*  App server functions (main app logic here).                       */
    /*  ================================================================  */

    /**
     *  Create the routing table entries + handlers for the application.
     */
    createRoutes = function() {
        routes = { };

        // Routes for /health, /asciimo, /env and /
    /*  self.routes['/health'] = function(req, res) {
            res.send('1');
        };

        self.routes['/asciimo'] = function(req, res) {
            var link = "http://i.imgur.com/kmbjB.png";
            res.send("<html><body><img src='" + link + "'></body></html>");
        };

        self.routes['/env'] = function(req, res) {
            var content = 'Version: ' + process.version + '\n<br/>\n' +
                          'Env: {<br/>\n<pre>';
            //  Add env entries.
            for (var k in process.env) {
               content += '   ' + k + ': ' + process.env[k] + '\n';
            }
            content += '}\n</pre><br/>\n'
            res.send('<html>\n' +
                     '  <head><title>Node.js Process Env</title></head>\n' +
                     '  <body>\n<br/>\n' + content + '</body>\n</html>');
        };

        self.routes['/'] = function(req, res) {
            res.set('Content-Type', 'text/html');
            res.send(self.cache_get('index.html') );
        };
    */
    };


    /**
     *  Initialize the server (express) and create the routes and register
     *  the handlers.
     */
    var initializeServer = function() {
        //createRoutes();
        app = express();

        //  Add handlers for the app (from the routes).
        /*for (var r in routes) {
            app.get(r, routes[r]);
        } */
    };


    /**
     *  Initializes the sample application.
     */
    var initialize = function() {
        setupVariables();
        //self.populateCache();
        setupTerminationHandlers();

        // Create the express server and routes.
        initializeServer();
    };


    /**
     *  Start the server (starts up the sample application).
     */
    var start = function() {
        //  Start the app on the specific interface (and port).
        app.listen(port, ipaddress, function() {
            console.log('%s: Node server started on %s:%d ...',
                        Date(Date.now() ), ipaddress, port);
        });
    };




/**
 *  main():  Main code.
 */
//var app = new SampleApp();
//app.initialize();

initialize();

    /************************
        Server Code Start
    ************************/

require('./config/passport')(passport);

app.use(session({
    name: 'session',
    secret: 'dfQOdm7KdGejWihd',
    resave: false,
    saveUninitialized: true,

    store: new MongoStore({ mongooseConnection: mongoose.connection })
    /*,duration: 30 * 60 * 1000,
    activeDuration: 5 * 60 * 1000 */
}));

ejs.delimiter = '$';
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs'); 


app.use(flash());


app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));

app.use(passport.initialize());
app.use(passport.session());

var routes = require('./controllers')(passport);

app.use(routes);


//app.start();
start();
