var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
  let filename = req.query.filename
  res.download('./static/' + filename)
})

module.exports = router;