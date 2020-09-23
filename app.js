const Koa = require('koa')
const kf = require('kf-router')
const fs = require('fs')
const app = new Koa()

process.on('SIGTERM', () => process.exit())
process.on('SIGINT', () => process.exit())

app.use(require('./middleware/cors.js'))
app.use(require('./middleware/params.js'))
app.use(require('./middleware/return.js'))
app.use(require('./middleware/mysql.js'))

app.use(kf())
app.listen(3000)
