'use strict';

var express = require('express');
var cors = require('cors');
var path = require('path');
var bodyParser = require('body-parser');
var helmet = require('helmet');
var multer = require('multer');

var app = express();

var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var upload = multer({ limits: { fileSize: 5000 } });

var sendMetadata = require('./controller').sendMetadata;

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.use(helmet());
app.use(cors());
app.use(jsonParser);
app.use(urlencodedParser);

app.post('/api/fileanalyse', upload.any(), sendMetadata);

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.get('/hello', function(req, res){
  res.json({greetings: "Hello, API"});
});

app.listen(process.env.PORT || 3000, function () {
  console.log('Node.js listening ...');
});
