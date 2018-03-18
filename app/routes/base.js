
const passport = require('passport');
const User = require('../models/user.auth.model');

  exports.index = function (req, res) {
    res.json({message: 'index page'}) //show all DB
  }
 ////////////////////////////////////////////////////////////////// 
  exports.show = function (req, res) {
    User.find(function(err, users) {
      if (err)
        res.send(err);
  
      res.json(users);
    });
  }
   ////////////////////////////////////////////////////////////////// 
  exports.update = function (req, res) {
    res.send('This is not implemented now'); //update DB
    
  }
   ////////////////////////////////////////////////////////////////// 

  exports.destroy = function (req, res) {
    res.send('This is not implemented now'); //delete user by id
    
  }
   ////////////////////////////////////////////////////////////////// 

  exports.register = function(req, res){
    var user = new User({
      username: req.body.username,
      password: req.body.password
    });
    user.save(function(err) {
      if (err)
        res.send(err);
  
      res.json({ message: 'New user added!' });
    });
  }
 ////////////////////////////////////////////////////////////////// 

  exports.logout = function(req, res){
    req.logout();
    res.send({status : 'logout'});
  }
 ////////////////////////////////////////////////////////////////// 

  exports.workspace = function (req, res) {
    res.json({message: 'workspace'}); //show all users
    
  }
 ////////////////////////////////////////////////////////////////// 

  exports.login = function(req, res){
    User.findOne({
      username: req.body.username
    }, function(username, err){
      if (err) throw err;

      if (!username) {
        return res.status(401).send({success: false, msg: 'Authentication failed username'});
      } 
      // check if password matches

      else {

          User.findOne({
              password: req.body.password
          }, function(password, err){
            if (err) throw err;

            if (!password) {
                return res.status(401).send({success: false, msg: 'Authentication failed password'});
            }

            else {

                res.status(200).send({success: true, msg: 'Authentication passed'});
            }
        })
      }
    })
  }