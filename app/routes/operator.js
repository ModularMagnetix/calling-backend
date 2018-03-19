const Script = require('../models/script.model');
const StatusModel = require('../models/base.model');
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
    var statistics = new StatusModel({
      no_answer: req.body.no_answer,
      no_connect : req.body.no_connect,
      deny : req.body.deny,
      callback : req.body.callback,
      appointment : req.body.appointment,
      comment : req.body.comment,
      appointment_time : req.body.appointment_time,
      age : req.body.age,
      comment : req.body.appointment_comment,
      month : req.body.month,
      operator : req.body.operator,
    });
    statistics.save(function(err) {
      if (err)
       return res.send(err);
  
      return res.json({ message: 'New statics added!' });
    });
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