<<<<<<< HEAD
const express = require('express');
const pool = require('../modules/pool');
const tools = require('../modules/tools');
const config = require('../modules/config');

const router = express.Router();

=======
// module imports

const express = require('express');
const tools = require('../modules/tools');
const config = require('../modules/config');
const router = express.Router();

// These endpoint functions are implementations from the Quickbooks OAuth2.0 SDK/toolkit
// https://github.com/citizenkanineapp/citizenkanineapp/blob/main/server/modules/tools.js

// API endpoint https://this_app/api/oauth2/connect_handler

>>>>>>> 3c819fd968d62af287bc36dee209a0e30ceda776
router.get('/connect_handler', (req, res) => {
    // GET route code here
    console.log('in api/oauth2/connect_handler');
    console.log(req.session.data)
    // console.log(req)
  
    // Set  Accounting scopes
    tools.setScopes('connect_handler')

<<<<<<< HEAD
    // // Constructs the authorization URI.
=======
    // Constructs the authorization URI: 
    // https://appcenter.intuit.com/connect/oauth2?client_id=XXXXXXXX&redirect_uri=https://this_app/api/callback&response_type=XXXXXX&scope=com.intuit.quickbooks.accounting
>>>>>>> 3c819fd968d62af287bc36dee209a0e30ceda776
    var uri = tools.intuitAuth.code.getUri({
        // Add CSRF protection
        state: tools.generateAntiForgery(req.session)
    })
    // Redirect
    console.log('Redirecting to authorization uri: ' + uri)
    // console.log('does it have header', res)
<<<<<<< HEAD
    res.redirect(uri);
  });

  router.get('/callback', function (req, res) {
=======
    // redirects request to intuit's oauth portal. This uri contains a parameter which redirects response to /callback endpoint below
    // redirect_uri=https://this_app/api/oauth2/callback   
    // to which intuit oauth portal will send an authorization code per OAuth2.0 protocol.
    res.redirect(uri);
});

// API endpoint https://this_app/api/oauth2/callback

router.get('/callback', function (req, res) {
>>>>>>> 3c819fd968d62af287bc36dee209a0e30ceda776
    console.log('in /api/quickbooks/callback');
    console.log('do we get req.session.realmId', req.session)
    // Verify anti-forgery
    if(!tools.verifyAntiForgery(req.session, req.query.state)) {
        return res.sendStatus('Error - invalid anti-forgery CSRF response!')
    }

    // Exchange auth code for access token
<<<<<<< HEAD
    tools.intuitAuth.code.getToken(req.originalUrl).then(async function (token) {
      
    tools.saveToken(req.session, token)

    console.log('token', token.data);
    
    req.session.realmId = req.query.realmId;

    res.redirect(config.redirectClientUri + '#/clients')
=======
    // this http exchange is handled by tools and its dependent modules

    tools.intuitAuth.code.getToken(req.originalUrl).then(async function (token) {
        // saves tokens in session data
        tools.saveToken(req.session, token)
        console.log('token', token.data);
        req.session.realmId = req.query.realmId;
        // tokens are returned to client in response object; client is redirected to to the 'clients' page in the desktop app
        res.redirect(config.redirectClientUri + '#/clients')
>>>>>>> 3c819fd968d62af287bc36dee209a0e30ceda776
    })
})

module.exports = router;
