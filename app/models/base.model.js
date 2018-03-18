var log = require('../libs/log')(module);
var config = require('../../app/config');
var env = process.env.NODE_ENV || 'development';
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.set('debug', true);
var autoIncrement = require('mongoose-auto-increment');
var connection = mongoose.createConnection(config.db);
log.debug('connetction created at :' + config.db);
//mongoose.connect(config.mongoose.uri, {});

//-------------------ERROR HANDLER---------------//
var db = mongoose.connection;


db.on('error', function (err) {
    log.error('connection error:', err.message);
});
db.once('open', function callback () {
    log.info("Connected to DB!");
});
//-------------------ERROR HANDLER---------------//

var Schema = mongoose.Schema;

autoIncrement.initialize(connection);

var Clients = new Schema({
    
},{ "strict": false });

var Status = new Schema({
    status:{
        no_answer:  {
          type:String,
          default: ''
        },
        no_connect: {
          type:String,
          default: ''
        },
        deny:       {
          type:String,
          default: ''
        },
        callback:   {
          type:String,
          default: ''
        },
        appointm1ent: {
          type:String,
          default: ''
        },
        comment:      String
    },
    appointment: {
        appointment_time: String,
        age:              Number,
        comment:          String,
        came:          {
          type:String,
          default: ''
        },
        month:            String,
        close:            String,
        operator:         String
    }
});
  
Clients.plugin(autoIncrement.plugin, 'Clients');

var ClientModel = mongoose.model('Clients', Clients);

module.exports.ClientModel = ClientModel;