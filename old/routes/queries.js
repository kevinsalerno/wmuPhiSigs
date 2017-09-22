var mysql = require('mysql');
var randomstring = require('randomstring');
var password = require('./password');

var dbselect = {
    wmuPhiSigs : {
        connectionLimit : 500,
        host     : 'localhost',
        user     : 'wmuPhiSigs',
        password : 'icky81:Spare',
        database : 'wmuPhiSigs',
        debug    :  false
    }
}

var pool_wmuPhiSigs   = mysql.createPool(dbselect.wmuPhiSigs);

var generateSecret = function(){
    var pw = randomstring.generate({
        length: 7,
        charset: 'alphabetic'
    });

    console.log("Generated: " + pw);

    return password.genPassword(pw);
}

var databaseQuery = function(params, user, callback) {
    user.getConnection(function(err, connection) {
        if(err) {
            callback({"Result" : "Failed", "Reason" : "Error connecting database"});
            return;
        } else {
            connection.query(params.query_string, function(err, results) {
                connection.release();
                callback({"Result" : results, "Err" : err});
            });
        }
    });
}


var queries = {
// var pool_wmuPhiSigs   = mysql.createPool(dbselect.wmuPhiSigs);
// pool_wmuPhiSigs: mysql.createPool(dbselect.wmuPhiSigs),
//var databaseQuery = function(params, user, callback) {





// var manageLogin = function(username, password, callback) {
    manageLogin: function(username, secret, callback) {
    var params = {
        
        query_string : "CALL sp_manage_login("+mysql.escape(username)+", "+mysql.escape(secret)+");"
        
    }
    databaseQuery(params, pool_wmuPhiSigs, function(cb){
        callback(cb);
    });
},
//var getMembers = function(callback) {

getMembers: function(callback) {
    var params = {
        
        query_string : "CALL sp_get_members();"
        
    }
    databaseQuery(params, pool_wmuPhiSigs, function(cb){
        callback(cb);
    });
},

getSalt: function(user, callback) {
    var params = {
        
        query_string : "CALL sp_get_salt(" + mysql.escape(user) + ");"
    }
    databaseQuery(params, pool_wmuPhiSigs, function(cb){
        callback(cb);
    });
},

createUser: function(userinfo,callback) {

    var username = userinfo.username;     
    var secret = generateSecret();

    console.log(secret);

    var firstname = userinfo.firstname;   
    var lastname = userinfo.lastname;    
    var pin = null;         
    var email = userinfo.email;       
    var ssn = null;         
    var address1 = '';
    var address2 = '';
    var city = '';
    var state = '';
    var status = 1;
    var eboard = null;
    var chair = null;
    var family = null;

    if (userinfo.pin > 0){
        pin = userinfo.pin;
        status = 2;
    }

    if (userinfo.ssn > 0){
        ssn = userinfo.ssn;
    }

    if (userinfo.address1){
        address1 = userinfo.address1;
    }

    if (userinfo.address2){
        address2 = userinfo.address2;
    }
    if (userinfo.city){
        city = userinfo.city;
    }

    if (userinfo.state){
        state = userinfo.state;
    }
    
    if (userinfo.status > 0){
        status = userinfo.status;
    }

    if (userinfo.eboard > 0){
        eboard = userinfo.eboard;
    }
    if (userinfo.chair > 0){
        chair = userinfo.chair;
    }
    
    if (userinfo.family > 0){
        family = userinfo.family;
    }

    var params = {
        
        query_string : "CALL sp_create_member("+mysql.escape(username)+ ", "+mysql.escape(secret.salt)+ ", "+mysql.escape(secret.hash)+ ", " + mysql.escape(firstname)+ ", " + 
        mysql.escape(lastname)+ ", " + mysql.escape(pin)+ ", " + mysql.escape(email)+ ", " + mysql.escape(ssn)+ ", " + 
        mysql.escape(address1)+ ", " + mysql.escape(address2)+ ", " + mysql.escape(city)+ ", " + mysql.escape(state)+ ", " + 
        mysql.escape(status)+ ", " + mysql.escape(eboard)+ ", " + mysql.escape(chair)+ ", " + mysql.escape(family) + ");"
        
    }
    console.log("QUERY: " + params.query_string);
    databaseQuery(params, pool_wmuPhiSigs, function(cb)
{        callback(cb);
    });
}

};


module.exports = queries;