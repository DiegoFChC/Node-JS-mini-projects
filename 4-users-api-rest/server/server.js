const http = require('node:http')
const { router } = require('./router')

const server = http.createServer((req, res) => {
  router(req, res)
})

module.exports = { server }