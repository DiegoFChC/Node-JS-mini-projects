const http = require('node:http')
const { tasksRoutes } = require('./routes/tasks.routes')
const { urlParser } = require('./middlewares/urlParser')

const PORT = process.env.PORT ?? 3002

const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, POST, PATCH, DELETE')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    res.writeHead(204)
    res.end()
    return
  }

  urlParser(req, res, () => tasksRoutes(req, res))
})

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
