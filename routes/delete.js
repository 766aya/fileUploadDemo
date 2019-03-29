var express = require('express');
var fs = require('fs');
var router = express.Router();

var sqlConnect = require('../util/sql')


router.delete('/:id', function (req, res, next) {
  let id = req.params.id
  let sqlOp = new sqlConnect()
  let dataObj = {}
  
  sqlOp.queryById(id).then((result) => {
    dataObj = result
    return sqlOp.deleteById(id)
  }).then(() => { // 删除磁盘文件
    fs.unlinkSync(`./static/${dataObj.staticname}`)
    res.json({
      code: 0,
      data: false,
      msg: `delete id ${dataObj.id} success`
    })
  }).catch(err=>{ // 异常响应
    res.json({
      code: 1,
      data: [],
      msg: `error: ${err}`
    })
  }).finally(()=>{ // 结束请求
    res.end()
  })
})

module.exports = router;