<<<<<<< HEAD
const express = require('express');
const axios = require('axios');
const pool = require('../modules/pool');
const tools = require('../modules/tools');
const config = require('../modules/config');
// const cors = require('cors');
const request = require('request');
const router = express.Router();

router.post('/', async (req, res) => {
  // console.log('in server post invoice',req.body);
=======
// module imports

const express = require('express');
const tools = require('../modules/tools');
const config = require('../modules/config');
const request = require('request');
const router = express.Router();

// api endpoint https://this_app/api/qbInvoice/

router.post('/', async (req, res) => {
  // console.log('in server post invoice',req.body);

  // tools module is an implementation of Quickbooks Online OAuth2.0 SDK/toolkit.
  // Module creates OAUTH token object
  // from client's session data sent to this endpoint as part of HTTP request;
  // https://github.com/citizenkanineapp/citizenkanineapp/blob/main/server/modules/tools.js

>>>>>>> 3c819fd968d62af287bc36dee209a0e30ceda776
  const token = tools.getToken(req.session);
  
  if (token) {

<<<<<<< HEAD
=======
    // generates query URL
>>>>>>> 3c819fd968d62af287bc36dee209a0e30ceda776
    const query = '/invoice?';
    const url = config.api_uri + req.session.realmId + query ;
    console.log('Making API INVOICE call to: ' + url);

<<<<<<< HEAD
    const invoicesList = createInvoiceItems(req.body);
    // console.log(invoicesList);
    // invoicesList.map(invoice => console.log(invoice.Line))  
=======
    // creates invoice objects
    const invoicesList = createInvoiceItems(req.body);
    // console.log(invoicesList);
    // invoicesList.map(invoice => console.log(invoice.Line))

    // batch-sends invoice objects to quickbooks
>>>>>>> 3c819fd968d62af287bc36dee209a0e30ceda776
    await Promise.all(invoicesList.map(invoice => {
      const requestObj = {
        method: 'POST',
        url: url,
        headers: {
          'Authorization': 'Bearer ' + token.accessToken,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        json: invoice
      }
<<<<<<< HEAD
      request(requestObj, function (err, response) {   
        // checks current access token. If access token is expired, it renews access token with stored refresh token.
=======

      // This function is an implementation of the Quickbooks OAuth2.0 SDK/toolkit
      request(requestObj, function (err, response) {   
        // checks current access token. If access token is expired, it renews access token using the stored refresh token.
>>>>>>> 3c819fd968d62af287bc36dee209a0e30ceda776
        tools.checkForUnauthorized(req, requestObj, err, response).then(function ({ err, response }) {
            // status code 401 corrosponds to unauthorized request.
            // in future testing. 'invalid_grant' also occurs;; err.body.error ;; when should we specify?
          if (response.statusCode === 401 ) {
<<<<<<< HEAD
            // If unauthorized, send this command back to client. if fetchQbCustomers in quickbooks.saga.js recieves command, client redirects to /connect_to_qb route.
=======
            // If unauthorized, send this response back to client.
            //if fetchQbCustomers() in quickbooks.saga.js recieves this response,
            //client redirects to this app server's /connect_to_qb endpoint.
>>>>>>> 3c819fd968d62af287bc36dee209a0e30ceda776
            res.send('connectToQB')
    
            // don't know if this second else-if block is necessary, ie, covering non-401 errors.
          } else if (err || response.statusCode != 200) {
            console.log('ERROR!', err, response.body, response.body.Fault.Error)

            //turned off since we don't have handling for it on client side
            //res.sendStatus(403)
          } else {
            console.log('invoice created')
            //doesn't work
          }
        }, function (err) {
          console.log('error in invoice request')
          // return res.json(err)
        })
      })
    }))
    res.sendStatus(201);

<<<<<<< HEAD
  } else {
    console.log('null token', token);
    res.send('connectToQb');
  }
})

function createInvoiceItems(invoiceItems) {
  const clients = new Set(invoiceItems.map(({qb_id}) => qb_id));
  // console.log(clients);
  const invoicesList = [];
  clients.forEach((client)=>{
    const invoice = {};
=======
    } else {
      console.log('null token', token);
      res.send('connectToQb');
    }
  })

// creating array of invoice objects
function createInvoiceItems(invoiceItems) {

  // creates set of unique client IDs and empty array object
  const clients = new Set(invoiceItems.map(({qb_id}) => qb_id));
  const invoicesList = [];
  // console.log('clients qbID: ', clients);

  //For each unique client in clients set, creates single invoice object.
  //invoice objects formatted to Quickbooks Online API
  clients.forEach((client)=>{
    // console.log(client)
    // One invoice object per client
    const invoice = {};

    // Force-allows online payments in Quickbooks billing; see quickbooks API reference
    // This was a surprise issue that came up after the first month of production.
    // My client alerted me that some of *her* clients did not receive any online-payment options in their monthy
    // billing email. I had to reinvestigate the QB online API/invoice object to diagnose this problem and 
    // then discover how to force this option to TRUE.
    
    invoice.AllowOnlineACHPayment=true;
>>>>>>> 3c819fd968d62af287bc36dee209a0e30ceda776
    invoice.CustomerRef = {
      "value": client
    }
    invoice.Line = [];
    invoicesList.push(invoice);

<<<<<<< HEAD
=======
    // loops through invoiceItems; if invoice item matches current client id,
    // pushes new line item to invoice.Line array
>>>>>>> 3c819fd968d62af287bc36dee209a0e30ceda776
    for (let item of invoiceItems) {
      if(item.qb_id === client) {
        invoice.Line.push({
          "Description": item.description,
          "Amount":item.service.price * item.dates.length,
<<<<<<< HEAD
      
=======
>>>>>>> 3c819fd968d62af287bc36dee209a0e30ceda776
          "DetailType":"SalesItemLineDetail",
          "SalesItemLineDetail": {
            "Qty": item.dates.length,
            "UnitPrice": item.service.price,
            "ItemRef": {
              "value": item.service.qb_id,
              "name": item.service.service
            }
          }      
<<<<<<< HEAD
        })
      }
    }
=======
        });
        invoice.BillEmail = {
          "Address": item.email
        }
      }
    }
    // console.log('new invoice', invoice)
>>>>>>> 3c819fd968d62af287bc36dee209a0e30ceda776
  })
  return invoicesList;
}

module.exports = router;
