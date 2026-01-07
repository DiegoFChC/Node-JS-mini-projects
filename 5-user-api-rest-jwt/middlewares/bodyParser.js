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
      return badRequest(res, 'Data not received')
    }
    try {
      req.body = body ? JSON.parse(body) : {}
      next()
    } catch {
      return badRequest(res, 'Invalid JSON format')
    }
  })

  req.on('error', (err) => {
    return internalServerError(res)
  })
}

module.exports = { bodyParser }
