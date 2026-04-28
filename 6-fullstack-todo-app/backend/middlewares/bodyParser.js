function bodyParser(req, res, next) {
  let data = ''

  req.on('data', (chunk) => {
    data += chunk.toString()
  })
  req.on('end', () => {
    if (data.length === 0) {
      res.statusCode = 400
      res.setHeader('Content-Type', 'application/json')
      return res.end(JSON.stringify({ message: 'Error loading the body' }))
    }

    try {
      req.body = JSON.parse(data)
      next()
    } catch {
      res.statusCode = 400
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify({ message: 'Invalid JSON format' }))
    }
  })
}

module.exports = { bodyParser }
