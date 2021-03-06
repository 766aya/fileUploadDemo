var express = require('express');
var multer = require('multer');
var uuid = require('uuid/v1');
var sqlConnect = require('../dbconnect/index');
var router = express.Router();


// 定制上传控件
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'static/') // 保存的路径，备注：需要自己创建 
  },
  filename: function (req, file, cb) { // 将保存文件名设置为 字段名 + 时间戳
    let fileFormat = (file.originalname).split('.') // 取后缀
    cb(null, uuid() + '.' + fileFormat[fileFormat.length - 1])
  }
})

// 将定制空间绑定到multer上
var upload = multer({
  storage,
})


// 新增数据SQL语句
var addSql = 'INSERT INTO uploadfiles(staticname, filename, mime, size) VALUES(?, ?, ?, ?)';

router.post('/', upload.single('file'), function (req, res, next) {

  var addSqlParams = [
    req.file.filename,
    req.file.originalname,
    req.file.mimetype,
    req.file.size
  ];
  
  // 执行数据库方法
  sqlConnect.query(addSql, addSqlParams, (err, result) => {
    if (!err) {
      res.json({
        code: 0,
        data: {
          fliename: req.file.filename
        },
        msg: 'success'
      })
    } else {
      res.json({
        code: 0,
        data: {},
        msg: `error ${err.message}`
      })
    }
    res.end()
  })

})

module.exports = router;