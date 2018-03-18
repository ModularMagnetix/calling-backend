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
      res.json({message: 'this endpoint should get workscript'})
  }