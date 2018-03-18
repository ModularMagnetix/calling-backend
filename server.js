require('dotenv').config();

const fs = require('fs');
const join = require('path').join;
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const log = require('./app/libs/log')(module);
const error = require('./app/libs/error')
const config = require('./app/config');
const models = join(__dirname, 'app/models');

const port = process.env.PORT || 8080;

const app = express();
const connection = connect();
const base = require('./app/routes/base');
const operator =require('./app/routes/operator');
const uploadXLSX = require('./app/routes/upload')
const authController = require('./app/controllers/auth');

var path = require('path');

module.exports = {
  app,
  connection
};

// Bootstrap models
fs.readdirSync(models)
  .filter(file => ~file.indexOf('.js'))
  .forEach(file => require(join(models, file)));

// Bootstrap routes
require('./app/config/passport')(passport);
require('./app/config/express.config')(app, passport);

var fileUpload = require('express-fileupload');

app.use(fileUpload());
//ADMIN CRUD
app.post('/admin/upload', uploadXLSX.upload); //upload excel file //
app.get('/', base.index); //show all DB //
app.get('/admin/users', authController.isAuthenticated, base.show); //show all users
app.delete('/admin/user/:id', authController.isAuthenticated, base.destroy); //delete user by id
app.post('/admin/user/register', base.register);
//
//USER CRUD
app.post('/login', base.login);
app.get('/logout', authController.isAuthenticated, base.logout);
app.get('/workspace', authController.isAuthenticated, base.workspace);
app.get('/workspace/comments', operator.getComment);
app.post('/workspace/comments', operator.postComment);
app.get('/workspace/statics', operator.getStatic);
app.post('/workspace/statics', operator.postStatic);
app.get('/workspace/script', operator.getScript);
//

//MANAGER CRUD

//
app.use(error);
app.listen(port);
log.info('The magic happens on port ' + port);

function connect () {
  var options = { reconnectTries : Number.MAX_VALUE,
    autoReconnect : true };
  var connection = mongoose.connect(config.db, options).connection;
  return connection;
}
