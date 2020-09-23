const config = require('./default.js')
const mysql = require('mysql2/promise')

mysql.autoCommit = true
let connectionPool = null

module.exports = {
  async getConnection() {
    if(!connectionPool){
      connectionPool = await mysql.createPool({
        ...config.sqlBase
    })
    }
    return await connectionPool.getConnection()
  },
}