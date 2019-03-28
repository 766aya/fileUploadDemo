var mysql = require('mysql')

// 创建连接
let connection = mysql.createConnection({
  host: '120.77.44.197',
  user: 'root',
  password: 'root',
  database: 'testDatabase'
})

// 执行创建连接
connection.connect();

module.exports = connection