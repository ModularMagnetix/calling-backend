const Script = require('../models/script.model');
const log = require('../libs/log')(module);
exports.postComment = function (req, res) {
    res.json({message: 'POST comment endpont'}) //show all DB
  }

  exports.getComment = function (req, res) {
    res.json({message: 'GET comment endpont'}) //show all DB
  }


  exports.getStatic = function (req, res) {
    res.json({message: 'GET statistics endpoint'}) //show all DB
  }

  exports.postStatic = function (req, res) {
    res.json({message: 'POST statistics endpoint'}) //show all DB
  }

  exports.getPhone = function (req, res) {
    res.json({message: 'this endpoint should get phonenumber by id'}) //show all DB
  }

  exports.getScript = function (req, res) {
    Script.find(function(err, script) {
      if (err)
        res.send(err);
  
      res.json(script);
    });
  }

  exports.workspace = function (req, res) {
    res.json({message: 'workspace'}); //show all users
    
  }