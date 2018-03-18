const excel = require('../libs/excel');
exports.upload = function(req, res){
    if (!req.files){
      return res.status(400).send('No files were uploaded.'); //upload excel file
    }
    
  
  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  let sampleFile = req.files.xlsFile;
 
  // Use the mv() method to place the file somewhere on your server
  sampleFile.mv('/tmp/base.xlsx', function(err) {
    if (err){
      return res.status(500).send(err);
    }
    res.send({status: 'OK'});
    excel();
  });
  }