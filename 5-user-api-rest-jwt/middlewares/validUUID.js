const { validUUID } = require('../utils/validUUID')
const { badRequest } = require('../utils/sendResponse')

function validUUIDMiddleware(req, res, next) {
  const id = req.slug

  if (!validUUID(id)) {
    return badRequest(res, 'Invalid user id')
  }

  next()
}

module.exports = { validUUIDMiddleware }