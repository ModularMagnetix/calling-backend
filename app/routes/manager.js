const Script = require('../models/script.model');
const log = require('../libs/log')(module);

exports.getScript = function (req, res) {
    Script.find(function(err, script) {
        if (err)
          res.send(err);
    
        res.json(script);
      });
}

exports.dropScript = function (req, res) {
    Script.remove({_id: req.params.script_id}, function(err) {
        if (err)
          return res.send(err);
    
        res.json({ message: 'Script removed from the DB!' });
      });
}

exports.postScript = function (req, res) {
    var script = new Script();

// Set the script properties that came from the POST data
script.getlost = req.body.getlost;
script.think = req.body.think;
script.notime = req.body.notime;
script.closed_date = req.body.closed_date;
script.company = req.body.company;
script.cosmetics = req.body.cosmetics;
script.manufacture = req.body.manufacture;
script.duration = req.body.duration;
script.reviews = req.body.reviews;
script.where_number = req.body.where_number;
script.need_take = req.body.need_take;
script.cost = req.body.cost;
script.alergy = req.body.alergy;
script.hormone = req.body.hormone;
script.tested = req.body.tested;
script.herpes = req.body.herpes;
script.time = req.body.time;
script.free = req.body.free;
script.selfcall = req.body.selfcall;
script.onmyown = req.body.onmyown;
script.passport = req.body.passport;
script.notInterested = req.body.notInterested;

// Save the script and check for errors
script.save(function(err) {
if (err)
  log.error(err);
log.debug('saved to script collection');
return res.status(200).send({success: true, msg: 'Script saved to DB'});
});
}