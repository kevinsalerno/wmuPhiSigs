// config/auth.js
var ipaddress = process.env.OPENSHIFT_NODEJS_IP;
var port      = process.env.OPENSHIFT_NODEJS_PORT || 8080;

var FACEBOOK_APP_ID = '914024115372167';
var FACEBOOK_APP_SECRET = 'f2140636a751ce6f59cfa5783d975d07';
var FACEBOOK_CALLBACK = '/auth/facebook/callback';

var GOOGLE_CLIENT_ID = '380666989070-f37tbbsvebr3ptudm5p7uiebi4rkemm0.apps.googleusercontent.com';
var GOOGLE_SECRET    = 'JGH5dLCK0VwYUfFemfqe3FX6';
var GOOGLE_CALLBACK  = 'http://foodie-krshosting.rhcloud.com/auth/google/callback';

// expose our config directly to our application using module.exports
module.exports = {

                            //api version: 'v2.5'
    'facebookAuth' : {
        'clientID'      : FACEBOOK_APP_ID, // your App ID
        'clientSecret'  : FACEBOOK_APP_SECRET, // your App Secret
        'callbackURL'   : FACEBOOK_CALLBACK
    },

    'googleAuth' : {
        'clientID'      : GOOGLE_CLIENT_ID,
        'clientSecret'  : GOOGLE_SECRET,
        'callbackURL'   : GOOGLE_CALLBACK
    }
    

};