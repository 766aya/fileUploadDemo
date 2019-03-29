var express = require('express');
var router = express.Router();

var sqlConnect = require('../util/sql')

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

  new sqlConnect()
    .queryByStaticname(filename)
    .then((result)=>{
      res.download(`./static/${ filename }`, result.filename)
    }).catch((err) => {
      res.json({
        code: 0,
        data: false,
        msg: `downloadFileError ${ err }`
      })
      res.end()
    })
})

module.exports = router;