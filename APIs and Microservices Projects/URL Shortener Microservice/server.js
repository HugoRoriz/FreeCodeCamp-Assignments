'use strict';

var express = require('express');
var mongodb = require('mongodb');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cors = require('cors');
var assert = require('assert');

var mongoClient = mongodb.MongoClient;
var dbUrl = process.env.MONGOLAB_URI;
require('dotenv').config();

var app = express();

// Basic Configuration 
var port = process.env.PORT || 3000;

/** this project needs a db !! **/ 
mongoose.connect(process.env.MONGOLAB_URI);

app.use(cors());

/** this project needs to parse POST bodies **/
// you should mount the body-parser here

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});
  
// your first API endpoint... 

app.get('/favicon.ico', function(req, res) {
  res.status(204);
});

mongoClient.connect(dbUrl, (err, client) => {
  
  var db = client.db('tinyUrls');

  if (err) { console.log('Unable to connect to the mongoDB server. Error:', err);
  
  } else {

    console.log('Connection established to', dbUrl);

    app.get("/api/shorturl/new/:url(*)", function(req, res) {
      
      var request = req.params.url;

      if (/^https?:\/\//.test(request) === true) {
        
        var collection = db.collection('tinyUrls');

        var tinyUrl = {};
        
        collection.count(function(err, result) {
          
          if (err) { console.log(err);

          } else {

            var num = result + 1;

            var shortUrl = num;

            tinyUrl = {index: num, original_url: request, short_url: shortUrl};

            collection.insert(tinyUrl, function(err, result) {

              if (err) { console.log(err);

              } else { console.log('Inserted %d documents into the tinyUrls collection. The documents inserted with "_id" are:', result.length, result);}
            
            });
            
            res.json({'original_url': request, 'short_url': shortUrl});
          }
        }); 
        
      } else { res.json({'error': 'invalid URL'});}
      
    }); 

    app.get('/api/shorturl/:index', function(req,res) {

      var urlNumber = req.params.index;

      var collection = db.collection('tinyUrls');        

      var query = {};

      var index = 'index';

      query.index = parseInt(urlNumber);

      collection.findOne(query, function(err, document) {

        if (err) { console.log(err); };

        if (document) { res.redirect(document.original_url);

        } else { res.json({'error': 'invalid URL'});}

      });
    
    }); 
  
  }

}); 

app.listen(port, function() {
  console.log('Node.js listening ...');
});
  