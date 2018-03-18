const excel = require('../libs/excel');
const Match = require('../models/database.match.model');
const JSONStream = require('JSONStream');
const fs = require('fs');
const path = require('path');
const log = require('../libs/log')(module);
const SaveToMongo = require('save-to-mongo')
const env = process.env.NODE_ENV || 'development';
const config = require('../config');

exports.postUpload = function(req, res){
    if (!req.body.name) {
        return res.status(400).send('Please select a DB name.');
    } 

    if (!req.files){
      return res.status(400).send('No files were uploaded.'); //upload excel file
    }

    if(!req.body.type){
        return res.status(400).send('No db status.');
    }

    if (!req.body.comment){
        return res.status(400).send('No db comment.');
    }
    
    function toMatch (){
        var match = new Match();

  // Set the match properties that came from the POST data
  match.name = req.body.name;
  match.type = req.body.type;
  match.comment = req.body.comment;
  // Save the match and check for errors
  match.save(function(err) {
    if (err)
      log.error(err);

    log.debug('saved to match collection');
  });
    
}

  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  let sampleFile = req.files.xlsFile;
  let name = req.body.name

  // Use the mv() method to place the file somewhere on your server
  sampleFile.mv('/tmp/base.xlsx', function(err) {
    if (err){
      return res.status(500).send(err);
    }
    res.send({status: 'uploaded'});
    excel(); //parse excel to json and wright to disk
  });
  var saveToMongo = SaveToMongo({
    uri: config.db,
    collection: name,
    bulk: {
      mode: 'ordered'
    }
  });

  fs.createReadStream('/tmp/data.json')
  .pipe(JSONStream.parse('*'))
  .pipe(saveToMongo)
  .on('execute-error', function(err) {
    log.error(err);
  })
  .on('done', function() {
    log.debug('Uploaded to mongo!');
    toMatch();
  });
  }

  exports.getUpload = function(req, res){
    Match.find(function(err, users) {
        if (err)
          res.send(err);
    
        res.json(users);
      });
  }