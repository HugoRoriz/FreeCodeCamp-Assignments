// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

app.use(express.static(__dirname + '/public'));

app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint... 
app.get('/api/whoami', function(req, res) {
  var result = {};
  var ipAddress = req.ip;

  var trimedIpAddress = ipAddress.replace(/[A-Za-z]|:/g, '');

  var language = req.headers['accept-language'];
  var trimedLanguage = language.slice(0, language.indexOf(','));
  
  var softwareInfo = req.headers['user-agent'];
  var startIndex = softwareInfo.indexOf('\(');
  var endIndex = softwareInfo.indexOf('\)');
  var trimedSoftwareInfo = softwareInfo.slice(startIndex + 1, endIndex);

  result = {
    ipaddress: trimedIpAddress,
    language: trimedLanguage,
    software: trimedSoftwareInfo,
  };
  res.json(result);
});

// listen for requests
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});