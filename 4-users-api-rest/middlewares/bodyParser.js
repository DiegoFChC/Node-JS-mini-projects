const { badRequest, unsupportedMedia, internalServerError } = require('../utils/sendResponse')

function bodyParser(req, res, next) {
  if (!req.contentType?.includes('application/json')) {
    return unsupportedMedia(res)
  }

  let body = ''

  req.on('data', (chunk) => {
    body += chunk.toString()
  })

  req.on('end', () => {
    if (body.length === 0) {
      badRequest(res, 'Data not received')
    }
    try {
      req.body = body ? JSON.parse(body) : {}
      next()
    } catch {
      badRequest(res, 'Invalid JSON format')
    }
  })

  req.on('error', (err) => {
    internalServerError(res)
  })

  next()
}

module.exports = { bodyParser }
