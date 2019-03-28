var express = require('express');
var sqlConnect = require('../dbconnect/index');
var router = express.Router();

var querySql = 'SELECT * FROM uploadfiles WHERE staticname = ?'

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
  sqlConnect.query(querySql, [filename], (err, result)=>{
    if(err || result.length===0) {
      res.json({
        code: 0,
        data: false,
        msg: `downloadFileError ${err || 'not found file!'}`
      })
      res.end()
    } else {
      res.download(`./static/${filename}`, result[0].filename)
    }
  })
})

module.exports = router;