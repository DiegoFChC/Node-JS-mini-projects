const { getAllUsers, getUserById } = require('../core/userStorage')
const { validUUID } = require('../utils/utils')

async function router(req, res) {
  const { url, method } = req
  const urlParts = url.split('/').filter(Boolean)

  if (method === 'GET') {
    if (url === '/') {
      res.statusCode = 200
      res.setHeader('Content-Type', 'text/plain')
      res.write('Welcome to my server')
      res.end()
    } else if (urlParts[0] === 'users' && urlParts[1]) {
      const possibleId = urlParts[1]
      if (!validUUID(possibleId)) {
        res.statusCode = 400
        res.setHeader('Content-Type', 'application/json')
        res.write(JSON.stringify({ message: 'Invalid user id' }))
        res.end()
      }
      try {
        const user = await getUserById(possibleId)
        if (user) {
          res.statusCode = 200
          res.setHeader('Content-Type', 'application/json')
          res.write(JSON.stringify(user))
          res.end()
        } else {
          res.statusCode = 404
          res.setHeader('Content-Type', 'application/json')
          res.write(JSON.stringify({ message: 'User id not found' }))
          res.end()
        }
      } catch {
        res.statusCode = 500
        res.setHeader('Content-Type', 'text/plain')
        res.write('An error has ocurred')
        res.end()
      }
    } else if (urlParts[0] === 'users' && !urlParts[1]) {
      try {
        const data = await getAllUsers()
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.write(JSON.stringify(data))
        res.end()
      } catch {
        res.statusCode = 500
        res.setHeader('Content-Type', 'text/plain')
        res.write('An error has ocurred while loading data')
        res.end()
      }
    } else {
      res.statusCode = 404
      res.setHeader('Content-Type', 'text/plain')
      res.write('Not found')
      res.end()
    }
  } else {
    res.statusCode = 405
    res.setHeader('Content-Type', 'text/plain')
    res.write('Method not allowed')
    res.end()
  }
}

module.exports = { router }
