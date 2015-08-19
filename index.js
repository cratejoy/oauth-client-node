var express = require('express');
var app = express();
app.set('port', (process.env.PORT || 3000));

// These environment variables must be set in 
// your .env file (as well as your heroku config).
// Submit a request to support@cratejoy.com to get
// the CRATEJOY_OAUTH_CLIENT_ID and CRATEJOY_OAUTH_SECRET.
var CRATEJOY_OAUTH_CLIENT_ID = process.env.CRATEJOY_OAUTH_CLIENT_ID;
var CRATEJOY_OAUTH_SECRET = process.env.CRATEJOY_OAUTH_SECRET;
var CRATEJOY_STORE_URL = process.env.CRATEJOY_STORE_URL;  // e.g. http://mystore.cratejoy.com
var SERVICE_URL = process.env.SERVICE_URL;  // base URL where this app is hosted


// Initialize the OAuth client
var oauth2 = require('simple-oauth2')({
  clientID: CRATEJOY_OAUTH_CLIENT_ID,
  clientSecret: CRATEJOY_OAUTH_SECRET,
  site: CRATEJOY_STORE_URL,
  tokenPath: '/oauth2/token',
  authorizationPath: '/oauth2/authorize'
});


// Declare Authorization URI
var authorization_uri = oauth2.authCode.authorizeURL({
  redirect_uri: SERVICE_URL + '/callback',
  scope: 'customer_identity'
});


// Index route for this app
app.get('/', function (req, res) {
  res.send(
    '<a href="/auth">Log in with your Cratejoy account</a>'
  );
});


// Local route that just redirects to your 
// Cratejoy store's authorization URL.
app.get('/auth', function (req, res) {
  res.redirect(authorization_uri);
});


// Callback route parses the authorization 
// token and asks for the access token
app.get('/callback', function (req, res) {
  var code = req.query.code;
  oauth2.authCode.getToken({
    code: code,
    redirect_uri: SERVICE_URL + '/callback'
  }, saveToken);

  function saveToken(error, result) {
    if (error) {
	  console.log('Access Token Error', error.message);
	}
	
	if (result) {
	  result.customer_identity_url = CRATEJOY_STORE_URL + '/v1/store/oauth/customer_identity/?access_token=' + result.access_token;
	  res.send(result);
      token = oauth2.accessToken.create(result);
	}
  }

});


app.listen(app.get('port'), function() {
  console.log('App running on port', app.get('port'));
});

