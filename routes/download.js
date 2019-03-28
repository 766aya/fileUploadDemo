var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
  if (!req.query.filename) {
    res.status(400).json({
      code: 1,
      data: '',
      msg: 'The file name field of the query failed!'
    })
    return res.end()
  }
  let filename = req.query.filename
  res.download('./static/' + filename)
})

module.exports = router;