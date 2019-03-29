class sqlOperation {
  constructor (sqlConnect = require('../dbconnect/index')) {
    this.sqlConnect = sqlConnect

    this.deleteByIdSql      = 'DELETE   FROM uploadfiles WHERE id = ?'
    this.queryByIdSql       = 'SELECT * FROM uploadfiles WHERE id = ?'
    this.queryByFileNameSql = 'SELECT * FROM uploadfiles WHERE staticname = ?'
  }
  deleteById (id) {
    return new Promise((resolve, reject) => {
      this.sqlConnect.query(this.deleteByIdSql, [id], (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(err)
        }
      })
    })
  }
  queryById (id) {
    return new Promise((resolve, reject) => {
      this.sqlConnect.query(this.queryByIdSql, [id], (err, result) => {
        if (err || result.length === 0) {
          reject(err || 'doc length is zero!')
        } else {
          resolve(result[0])
        }
      })
    })
  }
  queryByStaticname (filename) {
    return new Promise((resolve, reject) => {
      this.sqlConnect.query(this.queryByFileNameSql, [filename], (err, result) => {
        if (err || result.length === 0) {
          reject(err || 'doc length is zero!')
        } else {
          resolve(result[0])
        }
      })
    })
  }
}

module.exports = sqlOperation