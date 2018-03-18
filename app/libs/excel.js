var XLSX = require('xlsx');
var log = require('./log')(module);
var jsonfile = require('jsonfile');
var file = '/tmp/data.json'
var fs = require("fs");
var JSONStream = require('JSONStream');
var path = require('path');
var config = require('../config');
var env = process.env.NODE_ENV || 'development';
module.exports = function(){
    var workbook = XLSX.readFile('/tmp/base.xlsx');
    var sheet_name_list = workbook.SheetNames;
    var xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
      //read our XLSX parsed json
jsonfile.writeFile(file, xlData, {spaces: 2, EOL: '\r\n'}, function (err) {
  console.error(err);

  var SaveToMongo = require('save-to-mongo');

  var saveToMongo = SaveToMongo({
    uri: config.db,
    collection: 'phoneNumbers',
    bulk: {
      mode: 'unordered'
    }
  });
  fs.createReadStream('/tmp/data.json')
  .pipe(JSONStream.parse('*'))
  .pipe(saveToMongo)
  .on('execute-error', function(err) {
    console.log(err);
  })
  .on('done', function() {
    console.log('All done!');
  });
  
})
}