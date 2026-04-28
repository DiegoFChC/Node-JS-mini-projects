const http = require('node:http')
const { tasksRoutes } = require('./routes/tasks.routes')
const { urlParser } = require('./middlewares/urlParser')
const { corsMiddleware } = require('./middlewares/cors')

const PORT = process.env.PORT ?? 3002

const server = http.createServer((req, res) => {
  const isPreflight = corsMiddleware(req, res)

  if (isPreflight) return

  urlParser(req, res, () => tasksRoutes(req, res))
})

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
