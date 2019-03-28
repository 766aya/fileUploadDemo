var express = require('express');
var sqlConnect = require('../dbconnect/index');
var fs = require('fs');
var router = express.Router();

var deleteSql = 'DELETE FROM uploadfiles WHERE id = ?'
var queryOneSql = 'SELECT * FROM uploadfiles WHERE id = ?'

router.delete('/:id', function (req, res, next) {
  let id = req.params.id
  new Promise((resolve, reject) => { // 查询记录
    sqlConnect.query(queryOneSql, [id], (err, result) => {
      if (!err) {
        let dataObj = result[0]
        resolve(dataObj)
      } else {
        reject(err)
      }
    })
  }).then(result => { // 删除记录
    return new Promise((resolve, reject) => {
      sqlConnect.query(deleteSql, [id], (err, res) => {
        if (!err) {
          resolve(result)
        } else {
          reject(err)
        }
      })
    })
  }).then(result => { // 删除磁盘文件
    fs.unlinkSync(`./static/${result.staticname}`)
    res.json({
      code: 0,
      data: false,
      msg: `delete id ${result.id} success`
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