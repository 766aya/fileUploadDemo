var express = require('express');
var sqlConnect = require('../dbconnect/index');
var router = express.Router();

// 查询SQL语句
var querySql = 'SELECT * FROM uploadfiles'

/* GET query listing. */
router.get('/', function(req, res, next) {
  sqlConnect.query(querySql, function(err, result){
    if (!err) {
      //将结果以json形式返回到前台
      res.json({
        code: 0,
        data: result,
        msg: 'success'
      });
    } else {
      res.json({
        code: 1,
        data: [],
        msg: 'query database error'
      })
    }
    res.end()
  })
});

module.exports = router;
